/**
 * Created by jiljiang on 2016/10/12.
 */

import path from 'path';
import Express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const config = require('../devServer.webpack.config');

const app = new (Express)();
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath.replace(/^\./, '') }));
app.use(webpackHotMiddleware(compiler));

app.use('/builds', Express.static('builds'));
app.use('/scripts', Express.static('scripts'));


app.get('/', (req, res) => {
	res.sendFile(path.resolve(`${__dirname}/../index.html`));
});

app.listen(2017, () => {
	console.log('Server listening [port:2017]...');
});
