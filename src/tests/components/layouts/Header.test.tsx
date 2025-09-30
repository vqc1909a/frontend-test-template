import {cleanup, render, screen, within} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, test, vi} from "vitest";
import { Header } from "@/components/layouts/Header";


describe("Tests on Header Layout", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	const getHomeLink = () => screen.getByRole("link", {name: /gamershop/i});
	const getCartLink = () => screen.getByRole("link", {name: /cart/i});

	test("should render the header correctly", () => {
		render(<Header />);
		expect(getHomeLink()).toBeInTheDocument();
		expect(getCartLink()).toBeInTheDocument();
		expect(getHomeLink()).toHaveAttribute("href", "/");
		expect(getCartLink()).toHaveAttribute("href", "/cart");
		expect(within(getHomeLink()).getByRole("heading", {level: 1, name: /gamershop/i})).toBeInTheDocument();
		expect(within(getCartLink()).getByRole("img", {name: /cart/i})).toBeInTheDocument();
	});
});
