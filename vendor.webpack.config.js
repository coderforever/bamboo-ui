const path = require('path');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	devtool: 'source-map',

	entry: {
		vendor: [
			'classnames',
			'immutable',
			'jquery',
			'prop-types',
			'react',
			'react-css-modules',
			'react-dom',
			'react-redux',
			'react-router',
			'react-router-dom',
			'redux',
			'redux-logger',
			'redux-thunk',
			'warning',
		],
	},

	output: {
		path: path.join(__dirname, 'builds'),
		publicPath: '/builds/',
		filename: '[name].bundle.js',
		library: '[name]',
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(isProd ? 'production' : 'development'),
				__VERSION__: JSON.stringify(Date.now()),
			},
		}),

		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),

		new webpack.DllPlugin({
			context: __dirname,
			path: path.join(__dirname, 'builds', 'manifest.json'),
			name: '[name]',
		}),

		isProd ? new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			minimize: true,
			sourceMap: true,
			mangle: {
				screw_ie8: true,
				keep_fnames: true,
			},
			compress: {
				screw_ie8: true,
			},
			comments: false,
		}) : null,
	].filter(p => p),

	/* module: {
		loaders: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
				exclude: /node_modules/,
			},
		],
	}, */
};
