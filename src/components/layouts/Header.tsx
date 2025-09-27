import { areaNormal } from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
	return (
		<header className="header">
			<div className="container-custom h-full flex items-center justify-between text-custom-text-header">
				{/* Logo/Title */}
				<Link href="/catalog" className="flex items-center">
					<h1 className={`${areaNormal.className} text-2xl font-bold leading-6 tracking-[0.4px]`}>
						GamerShop
					</h1>
				</Link>

				{/* Cart Icon */}
				<Link
					href="/cart"
					className="flex items-center hover:opacity-80 transition-opacity"
				>
					<Image
						src="/icons/cart-icon.svg"
						alt="Cart"
						width={24}
						height={24}
						className="w-6 h-6"
					/>
				</Link>
			</div>
		</header>
	);
};
