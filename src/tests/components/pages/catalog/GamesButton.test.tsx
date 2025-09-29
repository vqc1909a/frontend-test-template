import {cleanup, render, screen} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, test, vi} from "vitest";
import {GamesButton} from "@/components/pages/catalog/GamesButton";
import {createMockSearchParams} from "@/mocks/utils";

vi.mock("next/navigation", () => ({
	usePathname: vi.fn(() => "/catalog"),
	useSearchParams: vi.fn(() =>
		createMockSearchParams({genre: "", page: "1"})
	),
}));

describe("Tests on GamesButton Component", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	test("should render the button when more pages are available", () => {
		render(<GamesButton totalPages={5} currentPage={1} />);
		expect(screen.getByRole("link", {name: /see more/i})).toBeInTheDocument();
	});

	test("should not render button when we are on the last page", () => {
		render(<GamesButton totalPages={3} currentPage={3} />);
		expect(screen.queryByRole("link", {name: /see more/i})).not.toBeInTheDocument();
	});

	test("should generate correct next page URL", () => {
		render(<GamesButton totalPages={5} currentPage={2} />);
		expect(screen.getByRole("link", {name: /see more/i})).toHaveAttribute("href", "/catalog?genre=&page=3");
	});

	test("should work with different search params", async () => {
		const mockUseSearchParams = vi.mocked(await import("next/navigation")).useSearchParams;
		mockUseSearchParams.mockReturnValueOnce(createMockSearchParams({genre: "Action"}) as any);

		render(<GamesButton totalPages={10} currentPage={3} />);

		const seeMoreButton = screen.getByRole("link", {name: /see more/i});
		expect(seeMoreButton).toHaveAttribute("href", "/catalog?genre=Action&page=4");
	});

	test("should work without any parameters", async () => {
		const mockUseSearchParams = vi.mocked(await import("next/navigation")).useSearchParams;
		mockUseSearchParams.mockReturnValueOnce(createMockSearchParams({ }) as any);

		render(<GamesButton totalPages={3} currentPage={1} />);
		
		const seeMoreButton = screen.getByRole("link", { name: /see more/i });
		expect(seeMoreButton).toHaveAttribute("href", "/catalog?page=2");
	});
});
