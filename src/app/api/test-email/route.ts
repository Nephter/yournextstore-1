// app/api/test-email/route.ts
import nodemailer from "nodemailer";

export async function GET() {
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

		const info = await transporter.sendMail({
			from: process.env.FROM_EMAIL,
			to: process.env.OWNER_EMAIL,
			subject: "Test email from Next.js + SendGrid",
			text: "If you see this, SMTP works ✅",
		});

		return Response.json({ success: true, messageId: info.messageId });
	} catch (err) {
		console.error("Email test error:", err);
		return new Response("Failed", { status: 500 });
	}
}
