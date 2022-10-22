import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "",
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "../../libs/components/"),
      "@stores": path.resolve(__dirname, "../../libs/stores/"),
      "@workspace-package.json": path.resolve(__dirname, "../../package.json"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@local-components": path.resolve(__dirname, "./src/components"),
    },
  },
});
