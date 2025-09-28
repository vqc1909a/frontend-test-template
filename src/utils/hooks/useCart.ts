import {useState, useEffect} from "react";
import { Game } from "../endpoint";

export interface CartItem {
	product: Game;
	quantity: number;
}

export const useCart = () => {
	const [cart, setCart] = useState<{cartItems: CartItem[], totalPrice: number}>({
		cartItems: [],
		totalPrice: 0,
	});

	//This is to avoid hydration mismatches
	const getCartFromStorage = () => {
		if (typeof window === "undefined") return { cartItems: [], totalPrice: 0 };
		const savedCart = JSON.parse(localStorage.getItem("cart") || '{"cartItems": [], "totalPrice": 0}');
		return savedCart;
	};

  const addToCart = (game: Game) => {
		const cartItems = cart.cartItems;
		const existingItem = cartItems.find(
			(item: any) => item.product.id === game.id
		);
		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			cartItems.push({product: game, quantity: 1});
		}
		const totalPrice = Number((cartItems.reduce((acc: number, value: CartItem) => acc + value.product.price * value.quantity, 0)).toFixed(2));
		localStorage.setItem("cart", JSON.stringify({cartItems, totalPrice}));
		setCart({
			cartItems,
			totalPrice
		});
	};

	const removeFromCart = (gameId: string) => {
		const cartItems = cart.cartItems;
		const updatedCartItems = cartItems.filter(
			(item: any) => item.product.id !== gameId
		);
		const totalPrice = Number((updatedCartItems.reduce((acc: number, value: CartItem) => acc + value.product.price * value.quantity, 0)).toFixed(2));
		localStorage.setItem("cart", JSON.stringify({cartItems: updatedCartItems, totalPrice}));
		setCart({
			cartItems: updatedCartItems,
			totalPrice
		});
	};

	const isInCart = (gameId: string) => {
		return cart.cartItems.some((item: any) => item.product.id === gameId);
	}

	useEffect(() => {
		const cart = getCartFromStorage();
		setCart(cart);
		//eslint-disable-next-line
	}, []);

	
	return {
		...cart,
		addToCart,
		removeFromCart,
		isInCart,
	};
};
