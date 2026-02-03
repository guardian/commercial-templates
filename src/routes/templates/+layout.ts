import { dev } from '$app/environment';

export const trailingSlash = dev ? 'never' : 'always';

export const prerender = true;
