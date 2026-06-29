import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://babyreisehelfer.pages.dev',
  output: 'static',
  integrations: [sitemap()]
});
