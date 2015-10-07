var path = require('path');
var util = require('util');
var pkg = require('./../package.json');

var stages = require('./stages')
var loaders = require('./loaders')
var plugins = require('./plugins')

var jsBundle = path.join('js', util.format('[name].%s.js', pkg.version));

var entry = {
  app: ['./index.jsx']
}

if (stages.DEV) {
  // webpack-dev-server
  entry.app.unshift('webpack/hot/dev-server')
  entry.app.unshift(util.format('webpack-dev-server/client?http://%s:%d', pkg.config.devHost, pkg.config.devPort))
}

var config = {
  context: path.join(__dirname, '../src'),
  target: 'web',
  entry: entry,
  output: {
    path: path.resolve(pkg.config.buildDir),
    publicPath: '/',
    filename: jsBundle
  },
  module: {
    loaders: loaders
  },
  plugins: plugins
};

if (stages.DEV) {
  config.cache = true;
  config.debug = true;
  config.devTool = 'inline-source-map';
  config.devServer = {
    contentBase: path.resolve(pkg.config.buildDir),
    hot: true,
    inline: true,
    stats: { colors: true }
  }
}

if (stages.DEV) {
  console.log(JSON.stringify(config, null, 2))
}

module.exports = config;
