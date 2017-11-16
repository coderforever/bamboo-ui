const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const cssMin = isProd ? '&minimize' : '';

const extractAppCSS = new ExtractTextPlugin({
	filename: 'style.css',
	allChunks: true,
});

module.exports = {
	devtool: isProd ? 'source-map' : 'cheap-eval-source-map',

	entry: {
		app: [
			!isProd ? 'react-hot-loader/patch' : null,
			!isProd ? 'webpack-hot-middleware/client' : null,
			'./src/index',
		].filter(item => item),
	},

	output: {
		path: path.join(__dirname, 'builds'),
		filename: 'bundle.js',
		publicPath: '/builds/',
	},

	plugins: [
		extractAppCSS,
		new webpack.HotModuleReplacementPlugin(),

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

		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./builds/manifest.json'),
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

	module: {
		loaders: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
				exclude: /node_modules/,
				include: __dirname,
			},
			{
				test: /\.scss/,
				use: isProd ? extractAppCSS.extract({
					fallback: 'style-loader',
					use: [
						`css-loader?sourceMap&importLoaders=1&modules&localIdentName=bmbo_[local]_[hash:base64:5]${cssMin}`,
						'postcss-loader?sourceMap=inline',
						'sass-loader?sourceMap',
					],
				}) : [
					'style-loader',
					'css-loader?sourceMap&importLoaders=1&modules&localIdentName=bmbo_[local]_[hash:base64:5]',
					'postcss-loader?sourceMap=inline',
					'sass-loader?sourceMap',
				],
				exclude: [/components/, /main.scss/],
			},
			{
				test: /\.scss/,
				use: isProd ? extractAppCSS.extract({
					fallback: 'style-loader',
					use: [
						`css-loader?sourceMap&importLoaders=1${cssMin}`,
						'postcss-loader?sourceMap=inline',
						'sass-loader?sourceMap',
					],
				}) : [
					'style-loader',
					'css-loader?sourceMap&importLoaders=1',
					'postcss-loader?sourceMap=inline',
					'sass-loader?sourceMap',
				],
				include: [/components/, /main.scss/],
			},
			{
				test: /\.css/,
				use: isProd ? extractAppCSS.extract({
					fallback: 'style-loader',
					use: [
						`css-loader?sourceMap&importLoaders=1${cssMin}`,
					],
				}) : [
					'style-loader',
					'css-loader?sourceMap&importLoaders=1',
				],
			},
			{
				test: /\.(woff|woff2|svg|eot|ttf)/,
				use: [
					{
						loader: 'file-loader',
						options: {
							prefix: 'font/',
						},
					},
				],
			},
			{
				test: /\.(png|gif|jpe?g|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							prefix: 'img/',
						},
					},
				],
			},
		],
	},

	/* module: {
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
					'css-loader?sourceMap&modules&importLoaders=1&localIdentName=bmbo_[local]_[hash:base64:5]!postcss-loader?sourceMap=inline!sass-loader?sourceMap',
				),
				exclude: [/components/, /main/],
			},
			{
				test: /\.scss/,
				loader: isProd ? ExtractTextPlugin.extract(
					'style-loader',
					'css-loader?sourceMap&importLoaders=1&localIdentName=bdp_[local]_[hash:base64:5]!postcss-loader?sourceMap=inline!sass-loader?sourceMap',
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
	}, */

	resolve: {
		modules: ['node_modules', path.resolve('./src')],
	},
};
