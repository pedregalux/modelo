// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import { defineConfig, fontProviders } from 'astro/config';

// El panel de Keystatic (/keystatic) requiere rutas en servidor (SSR).
// En los builds de producción (Cloudflare Pages) generamos un sitio 100% estático,
// por lo que se omite la integración. El CMS se usa en desarrollo (astro dev)
// conectado a GitHub: los cambios se confirman al repositorio y Cloudflare redepliega.
const isProductionBuild = !process.argv.includes('dev');
if (isProductionBuild) {
	process.env.SKIP_KEYSTATIC = 'true';
}

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	output: 'static',
	integrations: [
		react(),
		markdoc(),
		mdx(),
		sitemap(),
		// Keystatic solo en desarrollo: editar contenido en http://localhost:4321/keystatic
		...(isProductionBuild ? [] : [keystatic()]),
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