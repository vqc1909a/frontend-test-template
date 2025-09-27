'use client';
import {useCart} from "../hooks/useCart";
import {CartContext} from "./CartContext";

interface CartProviderProps {
	children: React.ReactNode;
}

export const CartProvider = ({children}: CartProviderProps) => {
	const cart = useCart();
	return (
		<CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
	);
};
