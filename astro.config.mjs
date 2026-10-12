import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

const isAndroid = process.env.TARGET === 'android';

// https://astro.build/config
export default defineConfig({
  site: isAndroid ? 'https://localhost' : 'https://jpnexe.github.io',
  base: isAndroid ? '/' : '/Proyecto_QRs_plus_8bits',
  output: 'static',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
