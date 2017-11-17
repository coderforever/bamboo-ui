export const canUseDOM = !!(
	(
		typeof window !== 'undefined' &&
		window.document && window.document.createElement
	)
);

export const isDev = process.env.NODE_ENV !== 'production';

export default {};
