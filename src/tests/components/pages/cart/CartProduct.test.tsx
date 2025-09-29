import { CartProductButton } from "@/components/pages/cart/CartProductButton";
import { CartProvider } from "@/utils/context/CartProvider";
import { allGames } from "@/utils/endpoint";
import {cleanup, render, screen, within} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import {userEvent} from "@testing-library/user-event";
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

	
  test("should render the product correctly", () => {
		const item = allGames[0];
    render(
			<CartProvider>
				<CartProduct item={item} />
			</CartProvider>
		);

		expect(screen.getByRole('img', {name: item.name})).toBeInTheDocument();
		expect(screen.getByLabelText("product-genre")).toHaveTextContent(item.genre);
		expect(screen.getByRole("heading", {level: 3, name: item.name})).toBeInTheDocument();
		expect(screen.getByLabelText("product-description")).toHaveTextContent(item.description);
		expect(screen.getByLabelText("product-price")).toHaveTextContent(`$${item.price}`);
	});

});