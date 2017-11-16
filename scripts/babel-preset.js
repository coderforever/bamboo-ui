const BABEL_ENV = process.env.BABEL_ENV;
const building = BABEL_ENV !== undefined && BABEL_ENV !== 'cjs';

const plugins = [];

if (BABEL_ENV === 'umd') {
	plugins.push('external-helpers');
}

if (process.env.NODE_ENV === 'production') {
	plugins.push(
		'transform-react-remove-prop-types',
	);
}

module.exports = {
	presets: [
		[
			'es2015', {
				modules: building ? false : 'commonjs',
			},
		],
		'stage-1',
		'react',
	],
	plugins,
}

/*
"plugins": [
	"transform-decorators-legacy",
	"transform-class-properties",
	"transform-object-rest-spread"
]
*/
