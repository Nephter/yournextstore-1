import { publicUrl } from "@/env.mjs";
import { getTranslations } from "@/i18n/server";
import { Reviews } from "@/ui/Reviews";
import InfoBanner from "@/ui/info-banner";
import { SearchNav } from "@/ui/nav/search-nav";
import { ProductList } from "@/ui/products/product-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/shadcn/tabs";
import { YnsLink } from "@/ui/yns-link";
import * as Commerce from "commerce-kit";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import type { Metadata } from "next/types";

export const metadata = {
	alternates: { canonical: publicUrl },
} satisfies Metadata;

export default async function Home() {
	noStore();

	const products = await Commerce.productBrowse({ first: 6 });
	const t = await getTranslations("/");

	return (
		<main>
			<div className="w-full overflow-hidden rounded">
				<Image
					alt="Hero Image"
					src="/hero.png"
					width={1920} // or your real image width
					height={1080} // or your real image height
					priority
					className="w-full h-auto"
					sizes="100vw"
				/>
			</div>

			<InfoBanner />

			<section className="w-full ">
				<Tabs defaultValue="products" className="w-full ">
					<div className="w-full items-center  py-10 flex pr-4">
						<TabsList>
							<TabsTrigger value="products" className="text-lg">
								Products
							</TabsTrigger>
							<TabsTrigger value="reviews" className="text-lg">
								Reviews
							</TabsTrigger>
						</TabsList>

						<SearchNav />
					</div>

					<TabsContent value="products">
						<div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
							<div className="flex justify-between text-lg md:text-xl p-2 border-b md:border-b-0 md:border-r-2 mb-12 md:mb-0 border-neutral-600 min-w-[200px]">
								<div>All</div>
								<div>{products.length}</div>
							</div>

							<div className="flex-1">
								<ProductList products={products} />
							</div>
						</div>
					</TabsContent>

					<TabsContent value="reviews">
						<div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
							<div className="flex justify-between text-lg md:text-xl p-2 border-b md:border-b-0 md:border-r-2 mb-12 md:mb-0 border-neutral-600 min-w-[200px]">
								<div>All</div>
								<div>0</div>
							</div>

							<div className="flex-1">
								<Reviews />
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</section>
		</main>
	);
}
