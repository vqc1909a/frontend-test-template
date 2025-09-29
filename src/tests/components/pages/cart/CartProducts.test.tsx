import { CartProvider } from "@/utils/context/CartProvider";
import { allGames } from "@/utils/endpoint";
import {cleanup, render, screen, within} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { CartProducts } from "@/components/pages/cart/CartProducts";


const mockCartItems = vi.fn();

vi.mock("@/utils/hooks/useCart", async () => {
	const originalModule = await vi.importActual("@/utils/hooks/useCart");
	return {
		...originalModule,
		useCart: () => ({
			removeFromCart: vi.fn(),
			cartItems: mockCartItems(),
		}),
	};
});

describe("Tests on CartProducts Component", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	
  test("should render the products correctly", async () => {
		const cartItems = allGames.slice(0, 3).map(game => ({ product: game, quantity: 1 }));
		mockCartItems.mockReturnValueOnce(cartItems as any);
		render(
			<CartProvider>
				<CartProducts />
			</CartProvider>
		);
		expect(screen.getAllByLabelText("cart-product")).toHaveLength(cartItems.length);
	});

	test("should render 'No Items Added' when cart is empty", () => {
		mockCartItems.mockReturnValueOnce([]);
		render(
			<CartProvider>
				<CartProducts />
			</CartProvider>
		);
		expect(screen.getByText(/no items added/i)).toBeInTheDocument();
	});
});