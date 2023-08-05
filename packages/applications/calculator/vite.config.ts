import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "./",
  plugins: [react()],
  clearScreen: false,
  server: {
    strictPort: true,
  },
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@workspace-package.json": path.resolve(
        __dirname,
        "../../../package.json",
      ),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@local-components": path.resolve(__dirname, "./src/components"),
    },
  },
});
