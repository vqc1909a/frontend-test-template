import {cleanup, render, screen} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, test, vi} from "vitest";
import { GamesGenreFilterSelect } from "@/components/pages/catalog/GamesGenreFilterSelect";
import { availableFilters } from "@/utils/endpoint";
import { createMockSearchParams } from "@/tests/utils";
import {userEvent} from "@testing-library/user-event";


vi.mock("next/navigation", () => {
	const mockReplace = vi.fn();

	return {
		usePathname: vi.fn(() => "/catalog"),
		useSearchParams: vi.fn(() =>
			createMockSearchParams({genre: "", page: "1"})
		),
		useRouter: () => ({
			replace: mockReplace,
			push: vi.fn(),
			prefetch: vi.fn(),
			back: vi.fn(),
			forward: vi.fn(),
			refresh: vi.fn(),
		}),
	};
});

describe("Tests on GamesGenreFilterSelect Component", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	test("should render the genre filter select", async () => {
		render(<GamesGenreFilterSelect  />);

		expect(screen.getByRole("combobox")).toBeInTheDocument();
		// +1 by this <option value="">All</option>
		expect(screen.getAllByRole("option").length).toBe(availableFilters.length + 1);
	});

	test("should have 'All' as the default selected option", async () => {
		render(<GamesGenreFilterSelect  />);
		expect(screen.getByRole("combobox")).toHaveValue("");
		expect(screen.getByRole("option", {name: /all/i})).toHaveValue("");
		expect(screen.getByRole("option", {name: /all/i})).toHaveTextContent("All");
		expect(screen.getByRole("option", {name: /all/i})).toHaveProperty("selected", true);
	});
	
	test("should have the correct option selected based on search params", async () => {
		const mockUseSearchParams = vi.mocked(await import("next/navigation")).useSearchParams;
		mockUseSearchParams.mockReturnValueOnce(createMockSearchParams({genre: "Adventure"}) as any);
		
		render(<GamesGenreFilterSelect  />);
		expect(screen.getByRole("combobox")).toHaveValue("Adventure");
	});

	test("should change the select value and call router.replace when an option is clicked", async () => {
		const mockReplace = vi.mocked((await import("next/navigation")).useRouter().replace);

		render(<GamesGenreFilterSelect  />);
		await userEvent.selectOptions(screen.getByRole("combobox"), "Shooter");
		expect(mockReplace).toHaveBeenCalledWith("/catalog?genre=Shooter");
	});
});
