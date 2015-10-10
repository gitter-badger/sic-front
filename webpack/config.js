var path = require('path');
var util = require('util');
var pkg = require('../package.json');

var stages = require('./stages')
var loaders = require('./loaders')
var plugins = require('./plugins')

var config = {
  context: path.join(__dirname, '../src'),
  target: 'web',
  cache: stages.DEV,
  debug: stages.DEV,
  devTool: stages.DEV ? 'inline-source-map' : false,
  entry: {
    app: ['./index.jsx']
  },
  output: {
    path: path.resolve(pkg.config.buildDir),
    publicPath: '/',
    filename: path.join('js', util.format('[name].%s.js', pkg.version))
  },
  module: {
    loaders: loaders
  },
  plugins: plugins
}

if (stages.DEV) {
  config.entry.app.unshift('webpack/hot/dev-server');
  config.entry.app.unshift(util.format('webpack-dev-server/client?http://%s:%d', pkg.config.devHost, pkg.config.devPort));

  config.devServer = {
    contentBase: path.resolve(pkg.config.buildDir),
    hot: true,
    inline: true,
    stats: { colors: true }
  }
}

console.log(JSON.stringify(config, null, 2))

module.exports = config;
