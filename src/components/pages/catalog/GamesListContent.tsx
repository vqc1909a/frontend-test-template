import { Game } from "@/utils/endpoint";
import { GameCard } from "./GameCard";

interface GameListContentProps {
  games: Game[]
}
export const GamesListContent = ({games}: GameListContentProps) => {
	if(!games.length) return (
		<div className="text-xl md:text-2xl font-bold text-custom-text-primary text-start">
			No Games Found
		</div>
	);
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 -mt-4 md:mt-0">
			{games.map((game) => (
				<GameCard key={game.id} game={game} />
			))}
		</div>
	);
};
