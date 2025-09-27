import Link from "next/link";
import Image from "next/image";
import { CartContent } from "@/components/pages/cart/CartContent";
import { CartTitle } from "@/components/pages/cart/CartTitle";

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

			<CartTitle />
			<CartContent />
		</div>
	);
}
