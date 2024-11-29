import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],
	kit: {
		// adapter-static is perfect for Cloudflare Pages
		adapter: adapter({
			// Fallback for SPA
			fallback: 'index.html',
			// Output directory
			pages: 'build'
		}),
		// Required for static adapter
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// ignore deliberate link to API (handled by custom 404 page)
				if (path.startsWith('/api')) {
					return;
				}
 
				// otherwise fail the build
				throw new Error(message);
			}
		}
	}
};

export default config;
