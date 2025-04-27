// app/components/Reviews.tsx

"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function Reviews() {
	const { data, error } = useSWR("/api/etsy-reviews", fetcher);

	if (error) return <div>Failed to load reviews.</div>;
	if (!data) return <div>Loading reviews...</div>;

	console.log("🚀 ~ Reviews ~ data:", data);
	return (
		<section className="max-w-5xl mx-auto py-12 px-4">
			<h2 className="text-2xl font-bold mb-8">What Our Customers Say</h2>
			{/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{data.reviews.map((review: any, index: number) => (
					<div key={index} className="border p-4 rounded-lg shadow-sm">
						<div className="flex items-center mb-2">
							{Array.from({ length: review.rating }).map((_, idx) => (
								<span key={idx} className="text-yellow-500">
									&#9733;
								</span> // ★
							))}
						</div>
						<p className="text-sm text-neutral-700 mb-2">"{review.text}"</p>
						<div className="text-xs text-neutral-500">– {review.user}</div>
					</div>
				))}
			</div>

			<div className="mt-8 text-center">
				<a
					href={data.shopUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-block bg-black text-white py-2 px-6 rounded-full hover:bg-black/80 transition"
				>
					See More on Etsy
				</a>
			</div> */}
		</section>
	);
}
