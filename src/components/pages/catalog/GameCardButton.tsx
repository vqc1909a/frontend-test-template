'use client'

import { CartContext } from "@/utils/context/CartContext";
import { Game } from "@/utils/endpoint";
import { useCart } from "@/utils/hooks/useCart";
import { useContext } from "react";
interface GameCardButtonProps {
	game: Game;
}

export const GameCardButton = ({game}: GameCardButtonProps) => {

	const {addToCart, removeFromCart, isInCart, cartIsReady} = useContext(CartContext);
	const productAdded = isInCart(game.id);

	if (!cartIsReady) {
		return (
			<button className="game-card-button mt-1" disabled>
				Loading...
			</button>
		);
	}

	return (
		<button 
			className="game-card-button mt-1" 
			onClick={productAdded ? () => removeFromCart(game.id) : () => addToCart(game)}
		>
			{productAdded ? "Remove" : "Add to Cart"}
		</button>
	);
};
