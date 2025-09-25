import {areaNormal} from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
	return (
		<header className="header h-16 w-full">
			<div className="container-custom h-full flex items-center justify-between text-custom-text-header">
				<h1
					className={`${areaNormal.className} text-2xl font-bold leading-6 tracking-[0.4px]`}
				>
					GamerShop
				</h1>

				<Image
					src="/icons/cart.svg"
					alt="Cart"
					width={24}
					height={24}
					className="w-6 h-6"
				/>
			</div>
		</header>
	);
};
