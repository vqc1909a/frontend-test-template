import { Game } from "@/utils/endpoint";
import Image from "next/image";
import { CartProductButton } from "./CartProductButton";

interface CartProductProps {
  item: Game,
}
export const CartProduct = ({item}: CartProductProps) => {
	return (
		<div className="cart-product">
			{/* Cart item with fixed height */}
			<div className="grid grid-cols-12 grid-rows-[repeat(4,minmax(0,78px))] md:grid-rows-[repeat(1,minmax(0,156px))] gap-y-5 gap-x-0 md:gap-x-5 md:gap-y-5 items-center">
				{/* Image */}
				<div className="h-full relative overflow-hidden col-start-1 col-end-12 row-start-1 row-end-3 md:col-start-1 md:col-end-6 md:row-start-1 md:row-end-2">
					<Image
						src={item.image}
						alt={item.name}
						fill
						className="object-cover hover:scale-105 transition-transform duration-300 will-change-transform"
					/>
				</div>

				{/* Game Details */}
				<div className="h-full col-start-1 col-end-11 row-start-3 row-end-5 md:col-start-6 md:col-end-11 md:row-start-1 md:row-end-2 flex flex-col gap-3 md:py-2">
					<p className="text-custom-text-secondary text-base leading-4 font-bold uppercase tracking-normal">
						{item.genre}
					</p>
					<h3 className="text-custom-text-primary text-xl leading-6 font-bold tracking-wide">
						{item.name}
					</h3>
					<p className="text-custom-text-secondary text-base leading-5 font-normal tracking-normal mr-0 md:mr-4 line-clamp-4 overflow-hidden text-ellipsis">
						{item.description}
					</p>
				</div>

				{/* Price */}
				<div className="h-full col-start-11 col-end-13 row-start-3 row-end-5 md:col-start-11 md:col-end-12 md:row-start-1 md:row-end-2 flex items-end justify-end md:py-2">
					<span className="text-custom-text-primary font-bold text-xl leading-6 tracking-wide">
						${item.price}
					</span>
				</div>

				{/* Delete */}
				<CartProductButton productId={item.id} />
			</div>
		</div>
	);
};
