import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { crx } from "@crxjs/vite-plugin";
import manifest from "./public/manifest.json";

export default defineConfig({
  plugins: [
    react(),
    crx({
      // @ts-ignore
      manifest: {
        ...manifest,
        oauth2: {
          ...manifest.oauth2,
          client_id: process.env.VITE_OAUTH_CLIENT_ID || manifest.oauth2.client_id,
        },
      },
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
