import {CartProvider} from "@/utils/context/CartProvider";
import {allGames} from "@/utils/endpoint";
import {cleanup, render, screen} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, test, vi} from "vitest";
import { GameCard } from "@/components/pages/catalog/GameCard";

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

describe("Tests on GameCard Component", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	test("should render the card correctly", () => {
		const game = allGames[0];
		render(
			<CartProvider>
				<GameCard game={game} />
			</CartProvider>
		);
		expect(screen.getByLabelText("game-card")).toBeInTheDocument();
		expect(screen.getByRole("img", {name: new RegExp(game.name, "i")})).toBeInTheDocument();
		expect(screen.getByLabelText(/game-genre/i)).toHaveTextContent(game.genre);
		expect(screen.getByRole("heading", {level: 3, name: new RegExp(game.name, "i")})).toBeInTheDocument();
		expect(screen.getByLabelText(/game-price/i)).toHaveTextContent(`$${game.price}`);
		expect(screen.getByRole("button", {name: /add to cart/i})).toBeInTheDocument();
	});
});
