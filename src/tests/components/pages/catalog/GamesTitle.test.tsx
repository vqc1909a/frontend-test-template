import { GamesTitle } from "@/components/pages/catalog/GamesTitle";
import {render, screen} from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("Tests on GamesTitle Component", () => {
  test("should render the title correctly", () => {
    render(<GamesTitle />);
    expect(screen.getByRole("heading", { level: 2, name: /top sellers/i })).toBeInTheDocument();
  });
});