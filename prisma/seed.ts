import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
	const passwordHash = await bcrypt.hash("password123", 10);

	const user = await prisma.user.create({
		data: {
			name: "Test User",
			email: "test@example.com",
			password: passwordHash,
		},
	});

	console.log("Created user:", user);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
