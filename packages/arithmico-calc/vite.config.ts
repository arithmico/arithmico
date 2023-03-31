import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig(({ command, mode, ssrBuild }) => ({
  base: "./",
  plugins: mode === "offline" ? [react(), viteSingleFile()] : [react()],
  resolve: {
    alias: {
      "@workspace-package.json": path.resolve(__dirname, "../../package.json"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@local-components": path.resolve(__dirname, "./src/components"),
    },
  },
}));
