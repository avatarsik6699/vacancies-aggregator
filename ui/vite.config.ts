import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    checker({
      // e.g. use TypeScript check
      typescript: true,
    }),
  ],
  resolve: {
    alias: [
      { find: "@app", replacement: path.resolve(__dirname, "src", "app") },
      { find: "@pages", replacement: path.resolve(__dirname, "src", "pages") },
      { find: "@shared", replacement: path.resolve(__dirname, "src", "shared") },
    ],
  },
});
