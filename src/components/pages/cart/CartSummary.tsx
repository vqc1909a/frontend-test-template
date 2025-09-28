'use client';
import { useContext } from "react";
import { CartContext } from "@/utils/context/CartContext";
import Link from "next/link";
import { calculateItemTotal } from "@/utils/helpers/cart";

export const CartSummary = () => {
	const { cartItems, totalPrice } = useContext(CartContext);

	return (
		<div className="flex flex-col gap-8 mt-4 md:mt-0">
			<div className="cart-summary">
				{/* Order Header */}
				<div className="flex flex-col gap-3">
					<h2 className="text-xl leading-6 md:text-2xl md:leading-7 font-bold text-left tracking-wide">
						Order Summary
					</h2>
					<p className="text-lg leading-6 tracking-wide font-normal">
						{cartItems.length} items
					</p>
				</div>
				{/* Order Items */}
				
				<div className="flex flex-col border-b border-custom-border-card py-6 gap-4">
					{cartItems.map(({product, quantity}) => (
						<div key={product.id} className="flex items-center justify-between">
							<h3 className="text-custom-text-primary font-normal text-lg leading-6 tracking-wide flex-1 min-w-0 truncate">
								{product.name}
							</h3>
							<span className="text-custom-text-primary font-normal text-lg leading-6 tracking-wide whitespace-nowrap flex-shrink-0">
								${calculateItemTotal(product.price, quantity)}
							</span>
						</div>
					))}
				</div>
				{/* Order Total */}
				<div className="flex items-center justify-between mb-6">
					<h3 className="text-custom-text-primary font-bold text-xl leading-6 tracking-wide flex-1 mr-3 truncate">
						Order Total
					</h3>
					<span className="text-custom-text-primary font-bold text-xl leading-6 tracking-wide whitespace-nowrap">
						$ {totalPrice}
					</span>
				</div>
			</div>
			<div className="flex justify-start items-center">
				<Link
					href={"/checkout"}
					className="btn-primary w-full capitalize"
				>
					Checkout
				</Link>
			</div>
		</div>
	);
}
