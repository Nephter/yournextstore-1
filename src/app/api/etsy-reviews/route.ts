import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET() {
	const browser = await puppeteer.launch({
		headless: true, // Run in headless mode
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
	});

	const page = await browser.newPage();
	await page.goto("https://www.etsy.com/shop/rrrshops/reviews", {
		waitUntil: "networkidle2", // Wait for the page to load fully
	});

	// Wait for the reviews to load
	await page.waitForSelector(".shop2-review-attribution");

	// Extract reviews from the page
	const reviews = await page.evaluate(() => {
		const reviewElements = Array.from(document.querySelectorAll(".wt-bt-xs"));

		return reviewElements.map((el) => {
			const reviewerName = el.querySelector(".shop2-review-attribution a")?.textContent || "Anonymous";
			const reviewText = el.querySelector(".prose")?.textContent || "No review text";
			const rating = el.querySelector('input[name="rating"]')?.getAttribute("value") || "5";
			const reviewPhoto = el.querySelector(".appreciation-photo__container img")?.getAttribute("src") || null;

			return {
				reviewerName,
				reviewText,
				rating,
				reviewPhoto,
			};
		});
	});

	await browser.close();

	return NextResponse.json(reviews);
}
