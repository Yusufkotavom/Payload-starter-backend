import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';
import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
  site: 'https://yourdomain.com',
  base: '/',
  trailingSlash: 'auto',
  build: {
    format: 'directory',
  },
  integrations: [
    react({
      include: ['**/*.{tsx,jsx}'],
    }),
    tailwind({
      config: {
        path: './tailwind.config.mjs',
      },
    }),
  ],
  output: 'static',
  adapter: vercel(),
  vite: {
    ssr: {
      external: ['svgo'],
    },
    optimizeDeps: {
      include: ['@headlessui/react', '@heroicons/react'],
    },
  },
  experimental: {
    assets: true,
  },
  server: {
    port: 4321,
    host: true,
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});