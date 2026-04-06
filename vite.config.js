import { defineConfig } from 'vite'

export default defineConfig({
  // This ensures assets are linked accurately with relative paths when deployed to GitHub Pages
  base: './'
})
