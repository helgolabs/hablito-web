import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  site: 'https://conjugito.com',
  integrations: [mdx({ remarkPlugins: [remarkGfm] })],
});
