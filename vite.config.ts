import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 8080,
	},
	resolve: {
		alias: {
			"@": "/src",
		},
	},
	appType: "spa",
	plugins: [
		react(),
		TanStackRouterVite({
			quoteStyle: "double",
			routesDirectory: "src/routes",
			routeFileIgnorePattern: ".test.tsx",
		}),
	],
});
