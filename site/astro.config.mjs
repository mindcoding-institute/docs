// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://mindcoding.institute',
  // Static output (default). Cloudflare Pages serves dist/ directly.
  vite: {
    ssr: {
      // Defensive: lets Vite bundle @webtui/css if a full-library import is ever used.
      noExternal: ['@webtui/css'],
    },
    server: {
      // The repo lives on a Windows-mounted drive under WSL2, where inotify
      // file events don't fire — without polling, `astro dev` never sees edits.
      watch: { usePolling: true, interval: 300 },
    },
  },
});
