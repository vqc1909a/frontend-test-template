import {cleanup, render, screen, within} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, test, vi} from "vitest";
import { Footer } from "@/components/layouts/Footer";


describe("Tests on Header Layout", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	const getHomeLink = () => screen.getByRole("link", {name: /apply digital logo/i});

	test("should render the footer correctly", () => {
		render(<Footer />);
		expect(screen.getByRole("contentinfo")).toBeInTheDocument();
		expect(getHomeLink()).toBeInTheDocument();
		expect(getHomeLink()).toHaveAttribute("href", "/");
		expect(within(getHomeLink()).getByRole("img", {name: /apply digital logo/i})).toBeInTheDocument();
	});
});
