'use client';
import { CartContext } from "@/utils/context/CartContext";
import { CartProduct } from "./CartProduct";
import {useContext} from "react";

export const CartProducts = () => {
	const {cartItems} = useContext(CartContext);
	
	if(!cartItems.length) return (
		<div className="text-lg md:text-xl font-bold text-custom-text-primary text-start">
			No Items Added
		</div>
	);
	return (
		<div className="flex flex-col gap-0">
			{cartItems.map((item) => (
				<CartProduct
					key={item.product.id}
					item={item.product}
				/>
			))}
		</div>
	);
};
