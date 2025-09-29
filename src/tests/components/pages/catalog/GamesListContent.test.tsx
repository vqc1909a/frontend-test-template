import {cleanup, render, screen} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, test, vi} from "vitest";
import {GamesListContent} from "@/components/pages/catalog/GamesListContent";
import {allGames} from "@/utils/endpoint";
import {CartProvider} from "@/utils/context/CartProvider";

const mockAddToCart = vi.fn();
const mockRemoveFromCart = vi.fn();
const mockIsInCart = vi.fn(() => false);

vi.mock("@/utils/hooks/useCart", async () => {
	const originalModule = await vi.importActual("@/utils/hooks/useCart");
	return {
		...originalModule,
		useCart: () => ({
			addToCart: mockAddToCart,
			removeFromCart: mockRemoveFromCart,
			isInCart: mockIsInCart,
		}),
	};
});

describe("Tests on GamesListContent Component", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	test("should render all the games", () => {
		const games = allGames;
		render(
			<CartProvider>
				<GamesListContent games={games} />
			</CartProvider>
		);
		expect(screen.getAllByLabelText("game-card").length).toBe(games.length);
		screen.debug();
	});
	
	test("should show 'No Games Found' message when there are no games", () => {
		render(
			<CartProvider>
				<GamesListContent games={[]} />
			</CartProvider>
		);
		expect(screen.getByText(/no games found/i)).toBeInTheDocument();
	});
});
