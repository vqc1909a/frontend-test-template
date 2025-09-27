'use client'
import { CartContext } from "@/utils/context/CartContext";
import { useContext } from "react";

export const CartTitle = () => {
	const { cartItems } = useContext(CartContext);
  return (
		<div className="flex flex-col gap-3">
			<h2 className="text-2xl leading-7 md:text-4xl md:leading-10 font-bold text-left tracking-[0.4px]">
				Your Cart
			</h2>
			<p className="text-xl leading-6 md:text-2xl md:leading-7 tracking-[0.4px] font-normal">
				{cartItems.length} items
			</p>
		</div>
	);
}
