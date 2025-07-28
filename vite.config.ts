/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts'; // For generating type definitions

export default defineConfig({
  publicDir: false,
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'), // end point
      name: 'echo', // global variable name
      fileName: (format) => `echo-circuit.${format}.js`,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [], // Add setup files here if needed for global test setup
  },
  plugins: [dts()], // Enable type definition generation
});