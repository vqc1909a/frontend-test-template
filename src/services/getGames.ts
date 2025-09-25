import {BACKEND_URL} from "../config/constants/environments";

interface Game {
  id: string;
  title: string;
  price: string;
  genre: string;
  image: string;
}

interface GamesResponse {
  games: Game[];
	availableFilters: string[];
	totalPages: number;
	currentPage: number;
}

export const getGames = async (): Promise<GamesResponse> => {
	const response = await fetch(`${BACKEND_URL}/api/games`, {
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
