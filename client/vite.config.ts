import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      "@/components/*": path.resolve(__dirname, "./src/components/*"),
      "@/containers/*": path.resolve(__dirname, "./src/components/*"),
      "@/constants/*": path.resolve(__dirname, "./src/constants/*"),
      "@/assets/*": path.resolve(__dirname, "./src/assets/*"),
      "@/hooks/*": path.resolve(__dirname, "./src/hooks/*"),
      "@/types/*": path.resolve(__dirname, "./src/types/*"),
      "@/store/*": path.resolve(__dirname, "./src/store/*"),
      "@/utils/*": path.resolve(__dirname, "./src/utils/*"),
    },
  }
})
