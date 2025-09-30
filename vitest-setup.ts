import "@testing-library/jest-dom/vitest";
import { vi } from 'vitest';

vi.mock("next/font/google", () => ({
    Inter: () => ({ className: "inter", variable: "--font-inter" }),
    Archivo: () => ({ className: "archivo", variable: "--font-archivo" }),
}));

vi.mock("next/font/local", () => ({
    default: () => ({ className: "local-font", variable: "--font-local" })
}));