import {getGames} from "@/services/getGames";
import { GamesButton } from "./GamesButton";
import { GamesListContent } from "./GamesListContent";

interface GamesListProps {
	genre: string;
	page: number;
}

export const GamesList = async ({genre, page}: GamesListProps) => {
	const {games, totalPages, currentPage} = await getGames({genre, page});
	
	return (
		<>
			<GamesListContent games={games} />
			<GamesButton totalPages={totalPages} currentPage={currentPage} />
		</>
	);
};
