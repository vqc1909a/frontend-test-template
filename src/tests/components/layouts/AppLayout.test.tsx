import {cleanup, render, screen, within} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, test, vi} from "vitest";
import { AppLayout } from "@/components/layouts/AppLayout";


describe("Tests on Header Layout", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});


	test("should render the AppLayout correctly", () => {
		render(<AppLayout><div>Children</div></AppLayout>);
		expect(screen.getByText(/children/i)).toBeInTheDocument();
		expect(screen.getByRole("banner")).toBeInTheDocument(); // Header
		expect(screen.getByRole("contentinfo")).toBeInTheDocument(); // Footer
	});
});
