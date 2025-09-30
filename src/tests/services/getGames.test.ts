import {allGames} from "@/utils/endpoint";
import {useCart} from "@/utils/hooks/useCart";
import {cleanup, renderHook} from "@testing-library/react";
import {act} from "react";
import {afterEach, beforeEach, describe, expect, test, vi} from "vitest";
import { getGamesFromParams } from "../utils";
import { getGames } from "@/services/getGames";
import { BACKEND_URL } from "@/config/constants/environments";


const mockFetch = vi.fn();
global.fetch = mockFetch;


describe("Tests on getGames service", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	test("should fetch games successfully with default parameters", async () => {
    const mockGamesResponse = getGamesFromParams();
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => mockGamesResponse,
		});

    const result = await getGames();
    expect(mockFetch).toHaveBeenCalledWith(`${BACKEND_URL}/api/games?genre=&page=1`, expect.any(Object));
    expect(result).toEqual(mockGamesResponse);
    expect(result.games).toHaveLength(mockGamesResponse.games.length);
    expect(result.availableFilters).toEqual(mockGamesResponse.availableFilters);
    expect(result.totalPages).toBe(mockGamesResponse.totalPages);
    expect(result.currentPage).toBe(mockGamesResponse.currentPage);
	});

  test("should fetch games successfully with specific genre and page", async () => {
    const genre = "Action";
    const page = 1;
    const mockGamesResponse = getGamesFromParams({genre, page});
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockGamesResponse,
    });

    const result = await getGames({genre, page});
    expect(mockFetch).toHaveBeenCalledWith(`${BACKEND_URL}/api/games?genre=${genre}&page=${page}`, expect.any(Object));
    expect(result).toEqual(mockGamesResponse);
    expect(result.games).toHaveLength(mockGamesResponse.games.length);
    expect(result.availableFilters).toEqual(mockGamesResponse.availableFilters);
    expect(result.totalPages).toBe(mockGamesResponse.totalPages);
    expect(result.currentPage).toBe(mockGamesResponse.currentPage);
  });

  test("should handle fetch error", async () => {
    const errorMessage = "Failed to fetch games";
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: errorMessage }),
    });

    await expect(getGames()).rejects.toThrow(errorMessage);
    expect(mockFetch).toHaveBeenCalledWith(`${BACKEND_URL}/api/games?genre=&page=1`, expect.any(Object));
  });

  test("should handle network error", async () => {
    const errorMessage = "Network Error";
    mockFetch.mockRejectedValueOnce(new Error(errorMessage));

    await expect(getGames()).rejects.toThrow(errorMessage);
    expect(mockFetch).toHaveBeenCalledWith(`${BACKEND_URL}/api/games?genre=&page=1`, expect.any(Object));
  });
});
