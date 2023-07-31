import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  base: "./",
  plugins: [react()],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@workspace-package.json": path.resolve(
        __dirname,
        "../../../package.json"
      ),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@local-components": path.resolve(__dirname, "./src/components"),
    },
  },
}));
