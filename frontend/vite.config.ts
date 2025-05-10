import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import vercel from "vite-plugin-vercel";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite(), vercel()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    proxy: {
      "/api/football": {
        target: "https://v3.football.api-sports.io",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/football/, "")
      }
    }
  }
});
