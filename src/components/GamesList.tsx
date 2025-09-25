import {Game} from "@/services/getGames";
import Image from "next/image";

interface GamesListProps {
	games: Game[];
}

export const GamesList = ({games}: GamesListProps) => {
	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 py-10">
				{games.map((game) => (
					<div key={game.id} className="game-card">
						{/* Game Image */}
						<div
							className="relative overflow-hidden rounded-t-2xl"
							style={{height: "240px"}}
						>
							<Image
								src={game.image}
								alt={game.name}
								fill
								className="object-cover hover:scale-105 transition-transform duration-300"
							/>
						</div>

						{/* Genre */}
						<p className="text-custom-text-secondary text-base leading-4 font-bold uppercase tracking-normal">
							{game.genre}
						</p>

						{/* Product Name and Price */}
						<div className="flex items-center justify-between">
							<h3 className="text-custom-text-primary font-bold text-lg leading-5 tracking-wide flex-1 mr-3 truncate">
								{game.name}
							</h3>
							<span className="text-custom-text-primary font-bold text-xl leading-6 tracking-wide whitespace-nowrap">
								${game.price}
							</span>
						</div>

					</div>
				))}
			</div>
		</div>
	);
};
