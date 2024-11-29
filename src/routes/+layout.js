// This enables prerendering for all routes
export const prerender = true;

// This enables client-side routing
export const ssr = false;

export const load = ({ url }) => {
	const { pathname } = url;

	return {
		pathname
	};
};
