"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { YnsLink } from "@/ui/yns-link";
import { useRouter } from "next/navigation"; // Importing useRouter
import { useState } from "react"; // Import useState for local state management
import { useActionState } from "react";
import { startTransition } from "react"; // Importing startTransition

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
	const [_state, action] = useActionState(login, {});
	const router = useRouter(); // Hook for routing
	const [isLoading, setIsLoading] = useState(false); // Track loading state
	const [loginError, setLoginError] = useState<string | null>(null); // Track login errors
	const [isLoggedIn, setIsLoggedIn] = useState(false); // Track successful login

	// Handling the form submission and redirect
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement); // Creating FormData from the form
		setIsLoading(true); // Set loading state to true

		startTransition(async () => {
			try {
				await action(formData); // Trigger the login action
				setIsLoggedIn(true); // Set login success state
				router.push("/"); // Redirect to the home page on success
			} catch (error) {
				setLoginError("Login failed. Please check your credentials and try again."); // Set error message
				setIsLoading(false); // Stop loading state on error
			}
		});
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>Enter your email below to login to your account</CardDescription>
				</CardHeader>{" "}
				<CardContent>
					<form onSubmit={handleSubmit}>
						{" "}
						{/* Replace action with handleSubmit */}
						<div className="grid gap-6">
							<div className="grid gap-6">
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input name="email" type="email" placeholder="m@example.com" required />
								</div>
								<div className="grid gap-2">
									<Label htmlFor="password">Password</Label>
									<Input name="password" type="password" required />
								</div>
								{/* Button with loading spinner */}
								<Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
									{isLoading ? (
										<span className="spinner-border spinner-border-sm"></span> // Loading spinner
									) : (
										"Login"
									)}
								</Button>

								{loginError && (
									<p className="text-red-500 text-sm mt-2">{loginError}</p> // Error message
								)}

								<YnsLink href="/">
									<Button className="w-full cursor-pointer" variant="outline">
										Continue as Guest
									</Button>
								</YnsLink>
								<YnsLink href="/register">
									<Button className="w-full mt-4 font-light cursor-pointer" variant="link">
										Dont have an account? Sign up
									</Button>
								</YnsLink>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
			{/* Success message after login */}
			{isLoggedIn && (
				<div className="text-green-500 text-center mt-4">
					<p>Login successful! Redirecting...</p>
				</div>
			)}

			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
				By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
				<a href="#">Privacy Policy</a>.
			</div>
		</div>
	);
}
