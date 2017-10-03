/**
 * Created by jiljiang on 2017/01/12.
 */

var config = require('./devServer.webpack.config');
config.output.publicPath = '/BigDataPortal/BDPComponent/builds/';

module.exports = config;
