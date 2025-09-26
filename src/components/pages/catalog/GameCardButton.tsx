'use client'

import { useEffect, useState } from "react";

interface GameCardButtonProps {
  gameId: string;
}

export const GameCardButton = ({gameId}: GameCardButtonProps) => {

	const [productAdded, setProductAdded] = useState(false);

  const addToCart = () => {
		const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

		const existingItem = cartItems.find(
			(item: any) => item.id === gameId
		);

		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			cartItems.push({id: gameId, quantity: 1});
		}

		localStorage.setItem("cart", JSON.stringify(cartItems));
		setProductAdded(true);
	};

	const removeFromCart = () => {
		const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
		
		const updatedCartItems = cartItems.filter(
			(item: any) => item.id !== gameId
		);
		localStorage.setItem("cart", JSON.stringify(updatedCartItems));
		setProductAdded(false);
	};

	useEffect(() => {
		const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
		const existingItem = cartItems.find((item: any) => item.id === gameId);
		setProductAdded(!!existingItem);
	}, [gameId]);

	return (
		<button className="game-card-button mt-2" onClick={productAdded ? removeFromCart : addToCart}>
			{productAdded ? "Remove" : "Add to Cart"}
		</button>
	);
};
