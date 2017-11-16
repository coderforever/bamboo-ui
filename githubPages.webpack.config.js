/**
 * Created by jiljiang on 2017/01/12.
 */

const config = require('./devServer.webpack.config');

config.output.publicPath = '/bamboo-ui/builds/';

module.exports = config;
