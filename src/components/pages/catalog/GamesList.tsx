import {getGames} from "@/services/getGames";
import { GameCard } from "./GameCard";
import { GamesButton } from "./GamesButton";

interface GamesListProps {
	genre: string;
	page: number;
}

export const GamesList = async ({genre, page}: GamesListProps) => {
	const {games, totalPages, currentPage} = await getGames({genre, page});
	
	if(!games.length) return (
		<div className="text-xl md:text-2xl font-bold text-custom-text-primary text-start">
			No Games Found
		</div>
	);
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
				{games.map((game) => (
					<GameCard key={game.id} game={game} />
				))}
			</div>
			<GamesButton totalPages={totalPages} currentPage={currentPage} />
		</>
	);
};
