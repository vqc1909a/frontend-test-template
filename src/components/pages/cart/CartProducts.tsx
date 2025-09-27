'use client';
import { useCart } from "@/utils/hooks/useCart";
import { CartProduct } from "./CartProduct";

export const CartProducts = () => {
	const { cartItems, removeFromCart } = useCart();
	return (
		<div className="flex flex-col gap-0">
			{cartItems.map((item) => (
				<CartProduct
					key={item.product.id}
					item={item.product}
					removeFromCart={removeFromCart}
				/>
			))}
		</div>
	);
};
