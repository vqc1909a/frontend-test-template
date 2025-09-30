import { CartProvider } from "@/utils/context/CartProvider";
import { allGames } from "@/utils/endpoint";
import {cleanup, render, screen, within} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { CartSummary } from "@/components/pages/cart/CartSummary";
import { calculateItemTotalPrice } from "@/utils/helpers/cart";


const mockCartItems = vi.fn();
const mockTotalPrice = vi.fn();

vi.mock("@/utils/hooks/useCart", async () => {
	const originalModule = await vi.importActual("@/utils/hooks/useCart");
	return {
		...originalModule,
		useCart: () => ({
			removeFromCart: vi.fn(),
			cartItems: mockCartItems(),
			totalPrice: mockTotalPrice(),
		}),
	};
});

describe("Tests on CartSummary Component", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	
  test("should render the cart summary correctly", () => {
		const cartItems = allGames.slice(0, 3).map(game => ({ product: game, quantity: 1 }));
		const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
		mockCartItems.mockReturnValueOnce(cartItems as any);
		mockTotalPrice.mockReturnValueOnce(totalPrice); 
    render(
			<CartProvider>
				<CartSummary />
			</CartProvider>
		);
		expect(screen.getByRole("heading", {level: 2, name: /order summary/i})).toBeInTheDocument();
		expect(screen.getByLabelText("cart-summary-items")).toHaveTextContent(`${cartItems.length} items`);
		expect(screen.getAllByRole("heading", {level: 3}).length).toBe(cartItems.length);
		expect(screen.getAllByRole("heading", {level: 3})[0]).toHaveTextContent(cartItems[0].product.name);
		expect(screen.getAllByLabelText("product-total-price").length).toBe(cartItems.length);
		expect(screen.getAllByLabelText("product-total-price")[0]).toHaveTextContent(`$${calculateItemTotalPrice(cartItems[0].product.price, cartItems[0].quantity)}`);
		expect(screen.getByRole("heading", {level: 4, name: /order total/i})).toBeInTheDocument();
		expect(screen.getByLabelText("cart-total-price")).toBeInTheDocument();
		expect(screen.getByLabelText("cart-total-price")).toHaveTextContent(`$ ${totalPrice}`);
		screen.debug();
		expect(screen.getByRole("link", {name: /checkout/i})).toBeInTheDocument();
		expect(screen.getByRole("link", {name: /checkout/i})).toHaveAttribute("href", "/checkout");
	});

	test("should render the cart summary with no items", () => {
		mockCartItems.mockReturnValueOnce([]);
		mockTotalPrice.mockReturnValueOnce(0); 
		render(
			<CartProvider>
				<CartSummary />
			</CartProvider>
		);
		expect(screen.getByLabelText("cart-summary-items")).toHaveTextContent(`0 items`);
		expect(screen.queryAllByRole("heading", {level: 3}).length).toBe(0);
		expect(screen.getByRole("heading", {level: 4, name: /order total/i})).toBeInTheDocument();
		expect(screen.queryAllByLabelText("product-total-price").length).toBe(0);
		expect(screen.getByLabelText("cart-total-price")).toHaveTextContent(`$ 0`);
	});
});