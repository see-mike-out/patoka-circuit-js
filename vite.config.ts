/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts'; // For generating type definitions

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'), // Your library's entry point
      name: 'echo', // Global variable name if using UMD/IIFE
      fileName: (format) => `echo.${format}.js`,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [], // Add setup files here if needed for global test setup
  },
  plugins: [dts()], // Enable type definition generation
});