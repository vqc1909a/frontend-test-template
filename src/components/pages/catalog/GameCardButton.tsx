'use client'

import { Game } from "@/utils/endpoint";
import { useCart } from "@/utils/hooks/useCart";
interface GameCardButtonProps {
	game: Game;
}

export const GameCardButton = ({game}: GameCardButtonProps) => {
	const {addToCart, removeFromCart, isInCart, cartIsReady} = useCart();
	const productAdded = isInCart(game.id);

	if (!cartIsReady) {
		return (
			<button className="game-card-button mt-2" disabled>
				Loading...
			</button>
		);
	}

	return (
		<button 
			className="game-card-button mt-2" 
			onClick={productAdded ? () => removeFromCart(game.id) : () => addToCart(game)}
		>
			{productAdded ? "Remove" : "Add to Cart"}
		</button>
	);
};
