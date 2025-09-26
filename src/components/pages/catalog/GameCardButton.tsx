'use client'

import { Game } from "@/services/getGames";
import { useEffect, useState } from "react";

interface GameCardButtonProps {
	game: Game;
}

interface CartItem {
	product: Game;
	quantity: number;
}

export const GameCardButton = ({game}: GameCardButtonProps) => {

	const [cart, setCart] = useState<{cartItems: CartItem[], totalPrice: number}>({
		cartItems: [],
		totalPrice: 0,
	});

	const [productAdded, setProductAdded] = useState(false);

  const addToCart = () => {
		const cartItems = JSON.parse(localStorage.getItem("cart") || '{"cartItems": [], "totalPrice": 0}')?.cartItems || [];

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
		})
		setProductAdded(true);
	};

	const removeFromCart = () => {
		const cartItems = JSON.parse(localStorage.getItem("cart") || '{"cartItems": [], "totalPrice": 0}')?.cartItems || [];
		
		const updatedCartItems = cartItems.filter(
			(item: any) => item.product.id !== game.id
		);
		const totalPrice = updatedCartItems.reduce((acc: number, value: CartItem) => acc + value.product.price * value.quantity, 0);
		localStorage.setItem("cart", JSON.stringify({cartItems: updatedCartItems, totalPrice}));
		setCart({
			cartItems: updatedCartItems,
			totalPrice
		})
		setProductAdded(false);
	};

	useEffect(() => {
		if(typeof window !== "undefined"){
			const card = JSON.parse(localStorage.getItem("cart") || '{"cartItems": [], "totalPrice": 0}');
			const cartItems = card?.cartItems || [];
			const existingItem = cartItems.find((item: any) => item.product.id === game.id);
			setProductAdded(!!existingItem);
			setCart(card);
		}
		//eslint-disable-next-line
	}, []);

	return (
		<button className="game-card-button mt-2" onClick={productAdded ? removeFromCart : addToCart}>
			{productAdded ? "Remove" : "Add to Cart"}
		</button>
	);
};
