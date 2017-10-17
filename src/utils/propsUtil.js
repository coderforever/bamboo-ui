export const toString = (props, defaultProps = {}) => {
	const str = Object.keys(props)
		.map((key) => {
			const value = props[key];
			if (value === undefined || defaultProps[key] === value) return null;

			if (value === null) {
				return `${key}={null}`;
			}

			if (Array.isArray(value)) {
				return `${key}={${JSON.stringify(value)}}`;
			}

			switch (typeof value) {
				case 'string':
					return `${key}="${value}"`;
				case 'number':
					return `${key}={${value}}`;
				case 'boolean':
					return value ? `${key}` : '';
			}

			console.warn('Unknown type of ', key, value);
			return null;
		})
		.filter(s => s)
		.join(' ');

	return str ? ` ${str}` : '';
};

export default {};
