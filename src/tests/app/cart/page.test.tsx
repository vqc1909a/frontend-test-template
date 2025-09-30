import {CartProvider} from "@/utils/context/CartProvider";
import {allGames} from "@/utils/endpoint";
import {cleanup, render, screen, within} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, test, vi} from "vitest";
import Cart from "@/app/cart/page";

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

describe("Tests on Cart Page", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	test("should render the cart page correctly", async () => {
    const cartItems = allGames.slice(0, 3).map(game => ({ product: game, quantity: 1 }));
    const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    mockCartItems.mockReturnValueOnce(cartItems as any);
    mockTotalPrice.mockReturnValueOnce(totalPrice); 
		const CartPage = await Cart();
		render(<CartProvider>{CartPage}</CartProvider>);
		expect(screen.getAllByLabelText("cart-product")).toHaveLength(cartItems.length);
		expect(screen.getByLabelText("cart-total-price")).toHaveTextContent(`$ ${totalPrice}`);

	});

  test("should render the cart page with no items", async () => {
    mockCartItems.mockReturnValueOnce([]);
    mockTotalPrice.mockReturnValueOnce(0);

    const CartPage = await Cart();
    render(<CartProvider>{CartPage}</CartProvider>);
    expect(screen.getByText(/no items added/i)).toBeInTheDocument();
		expect(screen.getByLabelText("cart-total-price")).toHaveTextContent(`$ 0`);
  });
});
