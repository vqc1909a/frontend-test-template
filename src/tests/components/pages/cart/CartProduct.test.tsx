import { CartProvider } from "@/utils/context/CartProvider";
import { allGames, Game } from "@/utils/endpoint";
import {cleanup, render, screen, within} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { CartProduct } from "@/components/pages/cart/CartProduct";


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

describe("Tests on CartProduct Component", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	
  test("should render the new product correctly", () => {
		const item = allGames.find(game => game.isNew)!;
    render(
			<CartProvider>
				<CartProduct item={item} />
			</CartProvider>
		);

		expect(screen.getByLabelText("cart-product")).toBeInTheDocument();
		expect(screen.getByRole('img', {name: item.name})).toBeInTheDocument();
		expect(screen.getByLabelText("product-genre")).toHaveTextContent(item.genre);
		expect(screen.getByRole("heading", {level: 3, name: item.name})).toBeInTheDocument();
		expect(screen.getByLabelText("product-description")).toHaveTextContent(item.description);
		expect(screen.getByLabelText("product-price")).toHaveTextContent(`$${item.price}`);
		expect(screen.getByLabelText("new-product")).toBeInTheDocument();
	});
	test("should render the used product correctly", () => {
		const item = allGames.find(game => !game.isNew)!;
		render(
			<CartProvider>
				<CartProduct item={item} />
			</CartProvider>
		);
		expect(screen.getByLabelText("cart-product")).toBeInTheDocument();
		expect(screen.getByRole('img', {name: item.name})).toBeInTheDocument();
		expect(screen.getByLabelText("product-genre")).toHaveTextContent(item.genre);
		expect(screen.getByRole("heading", {level: 3, name: item.name})).toBeInTheDocument();
		expect(screen.getByLabelText("product-description")).toHaveTextContent(item.description);
		expect(screen.getByLabelText("product-price")).toHaveTextContent(`$${item.price}`);
		expect(screen.queryByLabelText("new-product")).not.toBeInTheDocument();
	});

});