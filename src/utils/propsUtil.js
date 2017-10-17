export const toString = (props, defaultProps = {}) => {
	const str = Object.keys(props)
		.map((key) => {
			const value = props[key];
			if (!value || defaultProps[key] === value) return null;

			switch (typeof value) {
				case 'string':
					return `${key}="${value}"`;
				case 'number':
					return `${key}={${value}}`;
				case 'boolean':
					return `${key}`;
			}

			console.warn('Unknown type of ', key, value);
			return null;
		})
		.filter(s => s)
		.join(' ');

	return str ? ` ${str}` : '';
};

export default {};
