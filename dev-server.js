var util = require('util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var pkg = require('./package.json');
var config = require('./webpack/config')

var server = new WebpackDevServer(webpack(config), config.devServer)

server.listen(pkg.config.devPort, pkg.config.devHost, function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log(util.format('Listening at %s:%d', pkg.config.devHost, pkg.config.devPort));
});
