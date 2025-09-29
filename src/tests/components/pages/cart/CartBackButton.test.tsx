import {cleanup, render, screen, within} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, test, vi} from "vitest";
import {GamesButton} from "@/components/pages/catalog/GamesButton";
import {createMockSearchParams} from "@/mocks/utils";
import { CartBackButton } from "@/components/pages/cart/CartBackButton";

vi.mock("next/navigation", () => ({
	usePathname: vi.fn(() => "/catalog"),
	useSearchParams: vi.fn(() =>
		createMockSearchParams({genre: "", page: "1"})
	),
}));

describe("Tests on CartBackButton Component", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	const getBackToCatalog = () => screen.getByRole("link", {name: /back to catalog/i})
	test("should render the button correctly", () => {
		render(<CartBackButton />);
		screen.debug();

		expect(getBackToCatalog()).toBeInTheDocument();
		expect(getBackToCatalog()).toHaveAttribute("href", "/");
		expect(within(getBackToCatalog()).getByRole("img", {name: /back to catalog/i})).toBeInTheDocument();
	});

});
