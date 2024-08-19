import type { Config } from "jest";

const config: Config = {
	setupFilesAfterEnv: ["@testing-library/jest-dom", "<rootDir>/jest.setup.tsx"],
	coverageReporters: ["json", "html", "lcovonly"],
	testRegex: "test\\.ts(x)?$",
	preset: "ts-jest",
	testEnvironment: "jsdom",
	clearMocks: true,
	collectCoverage: true,
	reporters: ["default", "jest-junit"],
	collectCoverageFrom: ["src/**/*.{ts,tsx}"],
	coveragePathIgnorePatterns: [
		"App.tsx",
		"main.tsx",
		"env.ts",
		"routeTree.gen.ts",
		"tailwind-variables.ts",
		"index.(ts|tsx)",
		".mock.(ts|tsx)",
		"@fixtures",
	],
	testPathIgnorePatterns: ["<rootDir>/node_modules/"],
	transformIgnorePatterns: ["node_modules"],
	modulePathIgnorePatterns: [],
	transform: {
		".+\\.(ts|tsx)$": [
			"@swc/jest",
			{
				jsc: {
					transform: {
						react: {
							runtime: "automatic",
						},
					},
				},
			},
		],
	},
	moduleNameMapper: {
		"^(@/)(.*)$": "<rootDir>/src/$2",

		// https://jestjs.io/docs/webpack#handling-static-assets
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/__mocks__/image.ts",
	},
};

export default config;
