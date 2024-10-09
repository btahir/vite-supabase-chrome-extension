import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { crx } from "@crxjs/vite-plugin";
import manifest from "./public/manifest.json";

export default defineConfig({
  // @ts-ignore
  plugins: [react(), crx({ manifest })],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
