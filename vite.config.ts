import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { readFileSync, writeFileSync } from 'fs'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'replace-oauth-client-id',
      writeBundle() {
        const manifestPath = path.resolve(__dirname, 'dist', 'manifest.json')
        const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'))
        manifest.oauth2.client_id = process.env.VITE_OAUTH_CLIENT_ID
        writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        background: path.resolve(__dirname, 'src/background.ts'),
      },
    },
  },
})
