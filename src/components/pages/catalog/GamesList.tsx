import {getGames} from "@/services/getGames";
import { GamesButton } from "./GamesButton";
import { GamesListContent } from "./GamesListContent";

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
			<GamesListContent games={games} />
			<GamesButton totalPages={totalPages} currentPage={currentPage} />
		</>
	);
};
