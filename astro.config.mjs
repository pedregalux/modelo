// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://modelo-portfolio.pages.dev',
	// El panel de Keystatic (/keystatic) y su API (/api/keystatic) necesitan
	// renderizado en servidor. En Astro 7, `output: 'static'` permite que rutas
	// concretas opten por on-demand rendering con `export const prerender = false`
	// (como hace Keystatic). El resto de páginas se prerenderiza estáticamente.
	output: 'static',
	// El proyecto no usa Astro Sessions, evitamos aprovisionar KV.
	session: false,
	adapter: cloudflare({
		// Optimiza imágenes en tiempo de compilación y las sirve tal cual en runtime.
		imageService: 'compile',
	}),
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		react(),
		markdoc(),
		mdx(),
		sitemap(),
		keystatic(),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Cormorant Garamond',
			cssVariable: '--font-serif',
			fallbacks: ['Georgia', 'serif'],
			weights: [400, 500, 600, 700],
			styles: ['normal', 'italic'],
			subsets: ['latin', 'latin-ext'],
		},
	],
});
