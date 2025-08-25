import { NextResponse } from "next/server";

// Define the structure of the user in a review
interface EtsyUser {
	login_name?: string;
}

// Define the structure of a single review
interface Review {
	rating: number;
	review: string;
	user?: EtsyUser;
}

// Define the full Etsy API response structure
interface EtsyResponse {
	results: Review[];
}

export async function GET() {
	try {
		const res = await fetch(`https://openapi.etsy.com/v3/application/shops/rrrshops/reviews`, {
			headers: {
				"x-api-key": process.env.ETSY_API_KEY as string,
				Authorization: `Bearer ${process.env.ETSY_ACCESS_TOKEN}`, // if required
			},
		});

		if (!res.ok) {
			throw new Error("Failed to fetch reviews from Etsy");
		}

		const data = (await res.json()) as EtsyResponse;

		return NextResponse.json({
			reviews: data.results.map((review: Review) => ({
				rating: review.rating,
				text: review.review,
				user: review.user?.login_name || "Anonymous",
			})),
			shopUrl: `https://www.etsy.com/shop/rrrshops?section_id=reviews`,
		});
	} catch (err: unknown) {
		// make sure error type is handled properly
		let message = "Unknown error";
		if (err instanceof Error) {
			message = err.message;
		}

		return NextResponse.json({ error: message }, { status: 500 });
	}
}
