import { CartProductButton } from "@/components/pages/cart/CartProductButton";
import { CartProvider } from "@/utils/context/CartProvider";
import { allGames } from "@/utils/endpoint";
import {cleanup, render, screen, within} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import {userEvent} from "@testing-library/user-event";


const mockRemoveFromCart = vi.fn();

vi.mock("@/utils/hooks/useCart", async () => {
	const originalModule = await vi.importActual("@/utils/hooks/useCart");
	return {
		...originalModule,
		useCart: () => ({
			removeFromCart: mockRemoveFromCart,
		}),
	};
});

describe("Tests on CartProductButton Component", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	const getProductButton = () => screen.getByRole("button");
	
  test("should render the button correctly", () => {
		const productId = allGames[0].id;
    render(
			<CartProvider>
				<CartProductButton productId={productId} />
			</CartProvider>
		);
		expect(getProductButton()).toBeInTheDocument();
		expect(within(getProductButton()).getByRole("img", {name: /delete product/i})).toBeInTheDocument();
  });

	test("should execute removeFromCart when button is clicked", async () => {
		const productId = allGames[0].id;
		render(
			<CartProvider>
				<CartProductButton productId={productId} />
			</CartProvider>
		);
		await userEvent.click(getProductButton());
		expect(mockRemoveFromCart).toHaveBeenCalled();
		expect(mockRemoveFromCart).toHaveBeenCalledWith(productId);
	});

});