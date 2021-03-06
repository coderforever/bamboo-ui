import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

const config = {
	input: 'components/index.js',
	name: 'BambooUI',
	sourcemap: true,
	globals: {
		react: 'React',
		'react-dom': 'ReactDom',
	},
	external: [
		'react',
		'react-dom',
	],
	plugins: [
		babel({
			exclude: 'node_modules/**',
		}),
		resolve(),
		commonjs({
			include: /node_modules/,
		}),
		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
	],
};

if (process.env.NODE_ENV === 'production') {
	config.plugins.push(uglify());
}

export default config;
