import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react-swc";
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), TanStackRouterVite()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		proxy: {
			"/api/football": {
				target:
					process.env.VITE_API_BASE_URL || "https://v3.football.api-sports.io",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api\/football/, ""),
			},
		},
	},
});
