import { GamesButton } from "@/components/pages/catalog/GamesButton";
import { GamesList } from "@/components/pages/catalog/GamesList";
import { GenreFilter } from "@/components/pages/catalog/GenreFilter";
import { Suspense } from "react";
import { GamesListSkeleton } from "../ui/skeletons";
import Link from "next/link";
import Image from "next/image";
import { CartContent } from "@/components/pages/cart/CartContent";

export default async function Cart() {

	return (
		<div className="container-custom py-5 xs:py-7 md:py-8 flex flex-col gap-12">
			<Link
				href="/catalog"
				className="flex items-center gap-3 transition-colors duration-200 w-fit"
			>
				<Image
					src="/icons/back-icon.svg"
					alt="Back arrow"
					width={12}
					height={12}
					className="transition-transform duration-200 group-hover:-translate-x-1"
				/>
				<span className="text-base leading-4 font-medium tracking-normal">
					Back to Catalog
				</span>
			</Link>
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl leading-7 md:text-4xl md:leading-10 font-bold text-left tracking-[0.4px]">
					Your Cart
				</h2>
				<p className="text-xl leading-6 md:text-2xl md:leading-7 tracking-[0.4px] font-normal">
					3 items
				</p>
			</div>

			<CartContent />
		</div>
	);
}
