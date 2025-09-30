import {cleanup, render, screen} from "@testing-library/react";
import {afterEach, beforeAll, beforeEach, describe, expect, test, vi} from "vitest";
import {CartProvider} from "@/utils/context/CartProvider";
import { createMockSearchParams, getGamesFromParams } from "@/tests/utils";
import { GamesList } from "@/components/pages/catalog/GamesList";

vi.mock("@/services/getGames", async () => {
	const originalModule = await vi.importActual("@/services/getGames");
  const mockGetGames = vi.fn();

	return {
		...originalModule,
		getGames: mockGetGames,
	};
});

vi.mock("@/utils/hooks/useCart", async () => {
	const originalModule = await vi.importActual("@/utils/hooks/useCart");
	const mockAddToCart = vi.fn();
	const mockRemoveFromCart = vi.fn();
	const mockIsInCart = vi.fn(() => false);
	return {
		...originalModule,
		useCart: () => ({
			addToCart: mockAddToCart,
			removeFromCart: mockRemoveFromCart,
			isInCart: mockIsInCart,
		}),
	};
});

vi.mock("next/navigation", () => ({
	usePathname: vi.fn(() => "/catalog"),
	useSearchParams: vi.fn(() =>
		createMockSearchParams({genre: "", page: "1"})
	),
}));

describe("Tests on GamesList Component", () => {
	
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	test("should render games list from getGames service", async () => {
		const mockGetGames = vi.mocked(await import("@/services/getGames")).getGames;
		const gamesResponse = getGamesFromParams({genre: "", page: 2});
		mockGetGames.mockResolvedValue(gamesResponse);

		const GamesListComponent = await GamesList({genre: "", page: 2});
		render(<CartProvider>{GamesListComponent}</CartProvider>);
		expect(screen.getAllByLabelText("game-card").length).toBe(gamesResponse.games.length);
	});

	test("should render no games found message when getGames returns empty array", async () => {
		const mockGetGames = vi.mocked(await import("@/services/getGames")).getGames;
		const gamesResponse = getGamesFromParams({genre: "non-existent-genre", page: 1});
		mockGetGames.mockResolvedValue(gamesResponse);

		const GamesListComponent = await GamesList({genre: "non-existent-genre", page: 1});
		render(<CartProvider>{GamesListComponent}</CartProvider>);
		expect(screen.getByLabelText("no-games-found")).toBeInTheDocument();
		
	});

	test("should call getGames with correct parameters", async () => {
		const mockGetGames = vi.mocked(await import("@/services/getGames")).getGames;
		const gamesResponse = getGamesFromParams({genre: "action", page: 1});
		mockGetGames.mockResolvedValue(gamesResponse);


		const GamesListComponent = await GamesList({genre: "action", page: 1});
		render(<CartProvider>{GamesListComponent}</CartProvider>);

		expect(screen.getAllByLabelText("game-card").length).toBe(gamesResponse.games.length);
		expect(mockGetGames).toHaveBeenCalledWith({genre: "action", page: 1});
	});

	test("should handle API error gracefully", async () => {
		const mockGetGames = vi.mocked(await import("@/services/getGames")).getGames;
		mockGetGames.mockRejectedValue(new Error("API Error"));

		await expect(GamesList({genre: "", page: 1})).rejects.toThrow("API Error");
	});
});
