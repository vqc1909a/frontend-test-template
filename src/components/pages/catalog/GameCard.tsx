import Image from "next/image";
import { GameCardButton } from "./GameCardButton";
import { Game } from "@/utils/endpoint";

interface GameCardProps {
  game: Game;
}
export const GameCard = ({game}: GameCardProps) => {
  return (
		<div className="game-card">
			{/* Game Image */}
			<div className="relative overflow-hidden rounded-t-2xl h-[240px]">
				<Image
					src={game.image}
					alt={game.name}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
					className="object-cover hover:scale-105 transition-transform duration-300 will-change-transform"
				/>
			</div>

			{/* Genre */}
			<p className="text-custom-text-secondary text-base leading-4 font-bold uppercase tracking-normal" aria-label="game-genre">
				{game.genre}
			</p>

			{/* Product Name and Price */}
			<div className="flex items-center justify-between">
				<h3 className="text-custom-text-primary font-bold text-lg leading-5 tracking-wide flex-1 mr-3 line-clamp-1 overflow-hidden text-ellipsis">
					{game.name}
				</h3>
				<span className="text-custom-text-primary font-bold text-xl leading-6 tracking-wide whitespace-nowrap" aria-label="game-price">
					${game.price}
				</span>
			</div>

			{/* Add to Cart Button */}
			<GameCardButton game={game} />
		</div>
	);
}

