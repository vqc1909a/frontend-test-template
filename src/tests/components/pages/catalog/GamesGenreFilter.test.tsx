import {cleanup, render, screen} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, test, vi} from "vitest";
import { createMockSearchParams } from "@/tests/utils";
import { GamesGenreFilter } from "@/components/pages/catalog/GamesGenreFilter";


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

describe("Tests on GamesGenreFilter Component", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	test("should render the genre filter correctly", async () => {
		render(<GamesGenreFilter  />);

		expect(screen.getByLabelText(/genre/i)).toBeInTheDocument();
	});
});
