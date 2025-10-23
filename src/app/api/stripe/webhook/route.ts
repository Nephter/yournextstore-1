// app/api/stripe/webhook/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2025-03-31.basil",
});

export async function POST(req: Request) {
	const sig = req.headers.get("stripe-signature");

	if (!sig) {
		console.error("❌ No signature header");
		return new NextResponse("Missing signature", { status: 400 });
	}

	let event: Stripe.Event;

	try {
		const rawBody = await req.text(); // must be text, not json()
		event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.error("❌ Webhook signature verification failed:", err.message);
		} else {
			console.error("❌ Webhook signature verification failed with an unknown error.");
		}
		return new NextResponse("Webhook Error", { status: 400 });
	}

	if (event.type === "checkout.session.completed") {
		const session = event.data.object as Stripe.Checkout.Session;

		const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

		// Build email with shipping + items
		const shipping = session.customer_details;
		const products = lineItems.data.map((item) => `- ${item.description} x${item.quantity}`).join("\n");

		try {
			const transporter = nodemailer.createTransport({
				host: process.env.SMTP_HOST,
				port: Number(process.env.SMTP_PORT) || 587,
				secure: false,
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASS,
				},
			});

			await transporter.sendMail({
				from: process.env.FROM_EMAIL,
				to: process.env.OWNER_EMAIL,
				subject: `🛒 New Order: ${session.id}`,
				text: `
New order received!

Customer: ${shipping?.name || "N/A"}
Email: ${session.customer_details?.email || "N/A"}

Shipping Address:
${shipping?.address?.line1 || ""} ${shipping?.address?.line2 || ""}
${shipping?.address?.city || ""}, ${shipping?.address?.state || ""} ${shipping?.address?.postal_code || ""}
${shipping?.address?.country || ""}

Products:
${products}

Amount: ${(session.amount_total ?? 0) / 100} ${session.currency?.toUpperCase()}
    `,
			});
		} catch (error) {
			console.error("❌ Failed to send email:", error);
		}

		console.log("📧 Order email sent with shipping + products!");
	}

	return NextResponse.json({ received: true });
}

//! this still didnt show an email. no email no details. order showed up on stripe but not on sendgrid or in gmail

// // Handle only succeeded payment intents
// if (event.type === "payment_intent.succeeded") {
// 	const intent = event.data.object as Stripe.PaymentIntent;

// 	console.log("✅ Payment succeeded:", intent.id);

// 	// --- Email step ---
// 	try {
// 		const transporter = nodemailer.createTransport({
// 			host: process.env.SMTP_HOST,
// 			port: Number(process.env.SMTP_PORT) || 587,
// 			secure: false,
// 			auth: {
// 				user: process.env.SMTP_USER,
// 				pass: process.env.SMTP_PASS,
// 			},
// 		});

// 		await transporter.sendMail({
// 			from: process.env.FROM_EMAIL,
// 			to: process.env.OWNER_EMAIL,
// 			subject: `🛒 Test Order: ${intent.id}`,
// 			text: `Payment of ${(intent.amount_received ?? 0) / 100} ${intent.currency?.toUpperCase()} succeeded.\n\nCustomer: ${intent.shipping?.name ?? "N/A"}`,
// 		});

// 		console.log("📧 Order email sent!");
// 	} catch (mailErr) {
// 		console.error("❌ Failed to send email:", mailErr);
// 	}
// }
