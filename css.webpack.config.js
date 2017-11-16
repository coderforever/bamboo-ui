const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const cssMin = isProd ? '&minimize' : '';

const extractCommonCSS = new ExtractTextPlugin({
	filename: isProd ? 'bamboo-ui.min.css' : 'bamboo-ui.css',
	allChunks: true,
});

module.exports = {
	devtool: 'source-map',

	entry: {
		app: './scripts/css.js',
	},

	output: {
		path: path.join(__dirname, 'dist', 'css'),
		filename: 'css.js',
		sourceMapFilename: '[file].map',
		publicPath: '/',
	},

	plugins: [
		extractCommonCSS,
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(isProd ? 'production' : 'development'),
			},
		}),
	],

	module: {
		loaders: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.scss/,
				use: extractCommonCSS.extract({
					fallback: 'style-loader',
					use: [
						`css-loader?sourceMap&importLoaders=1${cssMin}`,
						'postcss-loader?sourceMap',
						'sass-loader?sourceMap',
					],
				}),
			},
		],
	},
};
