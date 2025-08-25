"use client";

import { Button } from "@/ui/shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/card";
import Image from "next/image";
import Link from "next/link";

export function Reviews() {
	return (
		<section className="max-w-md mx-auto px-4 py-12">
			<Card className="rounded-2xl shadow-lg bg-gradient-to-br from-purple-100 via-purple-50 to-pink-50">
				<CardHeader className="flex flex-col items-center">
					<Image
						src="/gengarQuestion.png"
						alt="Cute Gengar"
						width={100}
						height={100}
						className="drop-shadow-md"
					/>
					{/* <CardTitle className="mt-4 text-xl font-bold text-purple-800">
            Our Reviews
          </CardTitle> */}
				</CardHeader>
				<CardContent className="flex flex-col items-center text-center space-y-4">
					<p className="text-neutral-700">Oops! — we keep all our reviews up to date on Etsy!</p>
					<Button asChild>
						<Link
							href="https://www.etsy.com/shop/rrrshops?section_id=reviews#reviews"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-purple-800 font-bold text-lg hover:bg-purple-600"
						>
							See Etsy Reviews
						</Link>
					</Button>
				</CardContent>
			</Card>
		</section>
	);
}
