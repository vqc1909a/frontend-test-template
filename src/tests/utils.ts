const ITEMS_PER_PAGE = 12;

import { allGames, availableFilters } from "@/utils/endpoint";

export const createMockSearchParams = (params: Record<string, string> = {}) => {
	const searchParams = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		searchParams.set(key, value);
	});

	return searchParams;
};

export const getGamesFromParams = ({genre = "", page = 1} = {}) => {
		let games = allGames;
	
		if (genre) {
			games = games.filter(
				(game) => game.genre.toLowerCase() === genre.toLowerCase()
			);
		}
	
		const totalPages = Math.ceil(games.length / ITEMS_PER_PAGE);
	
		if (page < 1 || isNaN(page) || page > totalPages) page = 1;
	
		const fromIndex = (page - 1) * ITEMS_PER_PAGE;
		const toIndex = page * ITEMS_PER_PAGE;
	
		let gamesPerPage = games.slice(fromIndex, toIndex);
	
		const currentPage = page;

		return { games: gamesPerPage, availableFilters, totalPages, currentPage };

}
	