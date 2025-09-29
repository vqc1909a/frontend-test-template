import { CartTitle } from "@/components/pages/cart/CartTitle";
import { CartProvider } from "@/utils/context/CartProvider";
import { allGames } from "@/utils/endpoint";
import {cleanup, render, screen} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";


const mockCartItems = vi.fn(() => []);

vi.mock("@/utils/hooks/useCart", async () => {
	const originalModule = await vi.importActual("@/utils/hooks/useCart");
	return {
		...originalModule,
		useCart: () => ({
			cartItems: mockCartItems(),
		}),
	};
});

describe("Tests on CartTitle Component", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

  test("should render the title and items correctly", () => {
    const games = allGames.slice(0, 3);
    mockCartItems.mockReturnValueOnce(games as any);
    render(
			<CartProvider>
				<CartTitle />
			</CartProvider>
		);
    expect(screen.getByRole("heading", {level: 2, name: /your cart/i})).toBeInTheDocument();
    expect(screen.getByLabelText("cart-items")).toHaveTextContent(`${games.length} items`);
  });

	test("should render 0 items when cart is empty", () => {
		mockCartItems.mockReturnValueOnce([]);
		render(
			<CartProvider>
				<CartTitle />
			</CartProvider>
		);
		expect(screen.getByRole("heading", {level: 2, name: /your cart/i})).toBeInTheDocument();
		expect(screen.getByLabelText("cart-items")).toHaveTextContent("0 items");
	});
});