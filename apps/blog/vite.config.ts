import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "../../libs/components/"),
      "@workspace-package.json": path.resolve(__dirname, "../../package.json"),
    },
  },
});
