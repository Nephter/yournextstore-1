import { env } from "@/env.mjs";
import { unpackPromise } from "@/lib/utils";
import * as Commerce from "commerce-kit";
import { cartMetadataSchema } from "commerce-kit/internal";
import { revalidateTag } from "next/cache";
import nodemailer from "nodemailer";
import type Stripe from "stripe";

export async function POST(request: Request) {
	if (!env.STRIPE_WEBHOOK_SECRET) {
		return new Response("STRIPE_WEBHOOK_SECRET is not configured", { status: 500 });
	}

	const signature = (await request.headers).get("Stripe-Signature");
	if (!signature) {
		return new Response("No signature", { status: 401 });
	}

	const stripe = Commerce.provider({
		tagPrefix: undefined,
		secretKey: undefined,
		cache: "no-store",
	});

	const [error, event] = await unpackPromise(
		stripe.webhooks.constructEventAsync(await request.text(), signature, env.STRIPE_WEBHOOK_SECRET),
	);

	if (error) {
		console.error(error);
		return new Response("Invalid signature", { status: 401 });
	}

	switch (event.type) {
		case "payment_intent.succeeded": {
			const intent = event.data.object as Stripe.PaymentIntent;
			const metadata = cartMetadataSchema.parse(intent.metadata);

			if (metadata.taxCalculationId) {
				await stripe.tax.transactions.createFromCalculation({
					calculation: metadata.taxCalculationId,
					// @todo generate better references
					reference: intent.id.slice(3),
				});
			}

			const products = await Commerce.getProductsFromMetadata(metadata);

			for (const { product } of products) {
				if (product && product.metadata.stock !== Infinity) {
					await stripe.products.update(product.id, {
						metadata: {
							stock: product.metadata.stock - 1,
						},
					});

					revalidateTag(`product-${product.id}`);
				}
			}

			revalidateTag(`cart-${intent.id}`);

			// === NEW: Send yourself an email with order info ===
			try {
				console.log("----------Email", process.env.EMAIL_USER);
				const transporter = nodemailer.createTransport({
					host: process.env.SMTP_HOST, // "smtp.sendgrid.net"
					port: Number(process.env.SMTP_PORT) || 587,
					secure: false, // TLS via STARTTLS on 587
					auth: {
						user: process.env.SMTP_USER, // "apikey"
						pass: process.env.SMTP_PASS, // your SendGrid API key
					},
				});

				await transporter.sendMail({
					from: process.env.FROM_EMAIL, // must match your verified sender/domain
					to: process.env.OWNER_EMAIL,
					subject: `🛒 New Order: ${intent.id}`,
					text: `
New order received!

Customer: ${intent.shipping?.name || "N/A"}
Email: ${intent.receipt_email || "N/A"}
Address:
${intent.shipping?.address?.line1 || ""} 
${intent.shipping?.address?.line2 || ""}
${intent.shipping?.address?.city || ""}, ${intent.shipping?.address?.state || ""} ${intent.shipping?.address?.postal_code || ""}
${intent.shipping?.address?.country || ""}

Products:
${products.map((p) => `- ${p.product?.name || "Unknown"}`).join("\n")}

Amount: ${(intent.amount_received || 0) / 100} ${intent.currency?.toUpperCase()}
					`,
				});

				console.log("Order email sent!");
			} catch (mailErr) {
				console.error("Failed to send email:", mailErr);
			}

			break;
		}

		default:
			console.log(`Unhandled event type: ${event.type}`);
	}

	return Response.json({ received: true });
}
