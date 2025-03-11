import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import ImageOptimizer from "./dist/index.js"

export default defineConfig({
  plugins: [
    react(),
    ImageOptimizer({
      quality: 75,
      extensions: ["jpg", "jpeg", "png", "webp", "gif"],
      exclude: [/node_modules/],
      include: [/src\/assets/],
    }),
  ],
})

