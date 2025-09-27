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

	const [cartIsReady, setCartIsReady] = useState(false);

	const getCartFromStorage = () => {
		if (typeof window === "undefined") return { cartItems: [], totalPrice: 0 };
		const savedCart = JSON.parse(localStorage.getItem("cart") || '{"cartItems": [], "totalPrice": 0}');
		return savedCart;
	};

  const addToCart = (game: Game) => {
		const cartItems = getCartFromStorage()?.cartItems || [];
		const existingItem = cartItems.find(
			(item: any) => item.product.id === game.id
		);

		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			cartItems.push({product: game, quantity: 1});
		}
		const totalPrice = cartItems.reduce((acc: number, value: CartItem) => acc + value.product.price * value.quantity, 0);
		localStorage.setItem("cart", JSON.stringify({cartItems, totalPrice}));
		setCart({
			cartItems,
			totalPrice
		});
	};

	const removeFromCart = (gameId: string) => {
		const cartItems = getCartFromStorage()?.cartItems || [];
		const updatedCartItems = cartItems.filter(
			(item: any) => item.product.id !== gameId
		);
		const totalPrice = updatedCartItems.reduce((acc: number, value: CartItem) => acc + value.product.price * value.quantity, 0);
		localStorage.setItem("cart", JSON.stringify({cartItems: updatedCartItems, totalPrice}));
		setCart({
			cartItems: updatedCartItems,
			totalPrice
		});
	};

	const isInCart = (gameId: string) => {
		if (!cartIsReady) return false;
		return cart.cartItems.some((item: any) => item.product.id === gameId);
	}

	useEffect(() => {
		if(typeof window !== "undefined"){
			const cart = getCartFromStorage();
			setCart(cart);
			setCartIsReady(true);
		}
		//eslint-disable-next-line
	}, []);

	
	return {
		...cart,
		addToCart,
		removeFromCart,
		isInCart,
		cartIsReady
	};
};
