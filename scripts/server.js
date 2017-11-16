import path from 'path';
import Express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = new (Express)();

// ==========================================================================
// =                                 Webpack                                =
// ==========================================================================
const webpackConfig = require('../devServer.webpack.config');

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
	noInfo: true, publicPath: webpackConfig.output.publicPath,
}));
app.use(webpackHotMiddleware(compiler));

// ==========================================================================
// =                                   Res                                  =
// ==========================================================================
app.use('/assets', Express.static('assets'));
app.use('/builds', Express.static('builds'));
app.use('/scripts', Express.static('scripts'));


app.get('/', (req, res) => {
	res.sendFile(path.resolve(`${__dirname}/../index.html`));
});

app.listen(2017, () => {
	console.log('Server listening [port:2017]...');
});
