"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { register } from "@/lib/auth";
import { YnsLink } from "@/ui/yns-link";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RegisterForm() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false); // <-- NEW

	async function handleRegister(formData: FormData) {
		setLoading(true); // <-- Start loading
		const result = await register(formData);

		if (result.error) {
			setError(result.error);
			setSuccess(false);
			setLoading(false); // <-- Stop loading
		} else {
			setError(null);
			setSuccess(true);
			setTimeout(() => {
				router.push("/login");
			}, 1500);
		}
	}

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl">Create an Account</CardTitle>
				<CardDescription>Fill in your details below.</CardDescription>
			</CardHeader>
			<CardContent>
				<form action={handleRegister} className="flex flex-col gap-4">
					<Input name="name" placeholder="Name" required />
					<Input name="email" type="email" placeholder="Email" required />
					<Input name="password" type="password" placeholder="Password" required />
					<Button type="submit" disabled={loading} className="cursor-pointer">
						{loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Register"}
					</Button>
					<YnsLink href="/" className="">
						<Button type="button" variant="outline" className="w-full cursor-pointer">
							Cancel
						</Button>
					</YnsLink>
				</form>

				{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
				{success && <p className="text-green-500 text-sm mt-2">Account created! Redirecting...</p>}
			</CardContent>
		</Card>
	);
}
