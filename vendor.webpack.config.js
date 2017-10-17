/**
 * Created by jiljiang on 2016/10/12.
 */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	devtool: 'source-map',

	entry: {
		vendor: [
			"admin-lte",
			"bootstrap",
			"classnames",
			"immutable",
			"jquery",
			'prop-types',
			"react",
			"react-css-modules",
			"react-dom",
			"react-redux",
			"react-router",
			"react-router-dom",
			"redux",
			"redux-logger",
			"redux-thunk",
			"warning",
		]
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
			$: "jquery",
			jQuery: "jquery"
		}),

		new webpack.DllPlugin({
			context: __dirname,
			path: path.join(__dirname, 'builds', 'manifest.json'),
			name: '[name]',
		}),
		new ExtractTextPlugin('style.css', { allChunks: true }),

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

	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel'],
				exclude: /node_modules/,
				include: __dirname
			},
			/*{
				test: /\.scss/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader?sourceMap=inline!sass-loader?sourceMap'
				),
				exclude: /style/,
			},
			{
				test: /\.scss/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader?sourceMap&importLoaders=1!postcss-loader?sourceMap=inline!sass-loader?sourceMap'
				),
				include: /style/
			},*/
			{
				test: /\.css/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader'
				),
			},
			{
				test: /\.(woff|woff2|svg|eot|ttf)/,
				loader: 'file?prefix=font/'
			},
			{
				test:   /\.(png|gif|jpe?g|svg)$/i,
				loader: 'file?prefix=img/',
			},
		]
	},

	resolve: {
		modulesDirectories: ['node_modules']
	},
};
