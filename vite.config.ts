/// <reference types="vitest" />

import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	test: {
		environment: "jsdom",
		setupFiles: "./vitest-setup.ts",
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html", "lcov"],
			reportsDirectory: "./coverage",

			include: ["src/**/*.{ts,tsx}"],
			exclude: [
				"src/**/*.test.{ts,tsx}",
				"src/**/*.spec.{ts,tsx}",
				"src/tests/**/*",
				"src/**/__tests__/**/*",
				"src/**/*.stories.{ts,tsx}",
				"src/**/*.d.ts",
				"src/**/index.ts", 
			],
		},
		onConsoleLog(): boolean | void {
			return true;
		},
	},
});
