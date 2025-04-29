import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { RegisterForm } from "@/ui/RegisterForm";
import { ShirtIcon } from "lucide-react";

export const metadata: Metadata = {
	title: "Create an Account",
	description: "Sign up to start shopping and managing your orders.",
};

export default function RegisterPage() {
	return (
		<div className={cn("flex min-h-screen flex-col items-center justify-center bg-muted p-4")}>
			<div className="w-full max-w-md space-y-6">
				<div className="flex flex-col items-center space-y-2">
					<a href="/" className="flex items-center gap-2 font-medium">
						<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
							<ShirtIcon className="size-4" />
						</div>
						RRRSHOPS
					</a>
				</div>
				<RegisterForm />
			</div>
		</div>
	);
}
