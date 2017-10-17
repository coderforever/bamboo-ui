/**
 * Created by jiljiang on 2016/10/12.
 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	devtool: 'cheap-eval-source-map',

	entry: {
		app: [
			!isProd ? 'react-hot-loader/patch' : null,
			!isProd ? 'webpack-hot-middleware/client' : null,
			'./src/index',
		].filter(function (item) {
			return item;
		}),
	},

	output: {
		path: path.join(__dirname, 'builds'),
		filename: 'bundle.js',
		publicPath: '/builds/',
	},

	plugins: [
		new ExtractTextPlugin('style.css', { allChunks: true }),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(isProd ? 'production' : 'development'),
			},
		}),

		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),

		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./builds/manifest.json'),
		}),
	],

	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel'],
				exclude: /node_modules/,
				include: __dirname,
			},
			{
				test: /\.scss/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader?sourceMap&modules&importLoaders=1&localIdentName=bdp_[local]_[hash:base64:5]!postcss-loader?sourceMap=inline!sass-loader?sourceMap'
				),
				exclude: [/components/, /main/],
			},
			{
				test: /\.scss/,
				loader: isProd ? ExtractTextPlugin.extract(
					'style-loader',
					'css-loader?sourceMap&importLoaders=1&localIdentName=bdp_[local]_[hash:base64:5]!postcss-loader?sourceMap=inline!sass-loader?sourceMap'
				) : undefined,
				loaders: !isProd ? [
					'style-loader',
					'css-loader?sourceMap&importLoaders=1!postcss-loader?sourceMap=inline!sass-loader?sourceMap',
				] : undefined,
				include: [/components/, /main/],
			},
			{
				test: /\.css/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader',
				),
			},
			{
				test: /\.(woff|woff2|svg|eot|ttf)/,
				loader: 'file?prefix=font/',
			},
			{
				test: /\.(png|gif|jpe?g|svg)$/i,
				loader: 'file?prefix=img/',
			},
		]
	},

	resolve: {
		modulesDirectories: ['node_modules', './src'],
	},
};
