import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  base: '/',
  plugins: [devtools(), solidPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3250,
    watch: {
      usePolling: true,
      interval: 500,
    },
  },
  build: {
    sourcemap: false,
    target: 'esnext',
  },
});
