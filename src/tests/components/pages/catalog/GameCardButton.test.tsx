import {GameCardButton} from "@/components/pages/catalog/GameCardButton";
import {CartProvider} from "@/utils/context/CartProvider";
import {allGames} from "@/utils/endpoint";
import {cleanup, render, screen} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, test, vi} from "vitest";
import {userEvent} from "@testing-library/user-event";

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

describe("Tests on GameCardButton Component", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	test("should render the button correctly", () => {
		const game = allGames[0];
		render(
			<CartProvider>
				<GameCardButton game={game} />
			</CartProvider>
		);
		expect(
			screen.getByRole("button", {name: /add to cart/i})
		).toBeInTheDocument();
	});

	test("should execute addToCart when button is clicked and product is not in cart", async () => {
		const game = allGames[0];
		render(
			<CartProvider>
				<GameCardButton game={game} />
			</CartProvider>
		);
		await userEvent.click(screen.getByRole("button", {name: /add to cart/i}));
		expect(mockAddToCart).toHaveBeenCalledWith(game);
	});

	test("should execute removeFromCart when button is clicked and product is in cart", async () => {
		const game = allGames[0];
		mockIsInCart.mockReturnValueOnce(true);
		render(
			<CartProvider>
				<GameCardButton game={game} />
			</CartProvider>
		);
		expect(screen.getByRole("button", {name: /remove/i})).toBeInTheDocument();

		await userEvent.click(screen.getByRole("button", {name: /remove/i}));
		expect(mockRemoveFromCart).toHaveBeenCalledWith(game.id);
	});
});
