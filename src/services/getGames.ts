import {BACKEND_URL} from "../config/constants/environments";

export interface Game {
  id: string;
  genre: string;
  image: string;
  name: string;
	description: string;
  price: number;
	isNew: boolean;
}

export interface GamesResponse {
  games: Game[];
	availableFilters: string[];
	totalPages: number;
	currentPage: number;
}

export interface GetGamesProps {
	genre?: string;
	page?: number;
}
export const getGames = async ({genre = "", page = 1}: GetGamesProps): Promise<GamesResponse> => {
	const response = await fetch(`${BACKEND_URL}/api/games?genre=${genre}&page=${page}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		cache: "no-store", // Ensure fresh data on each request
	});
	if (!response.ok) {
		const error = await response.json();
		throw new Error(error?.message || "Failed to fetch games");
	}
	return response.json();
};
