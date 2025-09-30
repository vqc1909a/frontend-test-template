import {GET} from "@/app/api/games/route";
import {cleanup} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, test, vi} from "vitest";
import {availableFilters} from "../../../../utils/endpoint";
import { BACKEND_URL } from "@/config/constants/environments";

vi.mock("@/utils/endpoint", async () => {
	const actual = await vi.importActual("@/utils/endpoint");
	return {
		...actual,
		delay: vi.fn().mockResolvedValue(undefined),
	};
});

describe("Tests on API Route: /api/games", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	test("should return games with default parameters", async () => {
		const request = new Request(`${BACKEND_URL}/api/games`);

		const response = await GET(request);
		const data = await response.json();
		expect(response.status).toBe(200);

		expect(data.games).toHaveLength(12);
		expect(data.availableFilters).toEqual(availableFilters);
		expect(data.currentPage).toBe(1);
		expect(data.totalPages).toBe(3);
	});
	test("should return games filtered by genre", async () => {
		const genre = "Action";
		const request = new Request(
			`${BACKEND_URL}/api/games?genre=${genre}`
		);
		const response = await GET(request);
		const data = await response.json();
		expect(response.status).toBe(200);
		expect(data.games).toHaveLength(5);
		expect(data.availableFilters).toEqual(availableFilters);
		expect(data.currentPage).toBe(1);
		expect(data.totalPages).toBe(1);
	});

	test("should return games for a specific page", async () => {
		const page = 2;
		const request = new Request(
			`${BACKEND_URL}/api/games?page=${page}`
		);
		const response = await GET(request);
		const data = await response.json();
		expect(response.status).toBe(200);
		expect(data.games).toHaveLength(12);
		expect(data.availableFilters).toEqual(availableFilters);
		expect(data.currentPage).toBe(page);
		expect(data.totalPages).toBe(3);
	});
});
