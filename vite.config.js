import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import purgecss from 'vite-plugin-purgecss';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), 
    purgecss({
      content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
      ],
      safelist: [],
    }),
    visualizer({ open: true }),
  ],
});