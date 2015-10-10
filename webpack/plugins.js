var path = require('path');
var util = require('util');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var pkg = require('../package.json');
var stages = require('./stages');

var plugins = []

if (stages.DEV) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
  plugins.push(
    new ExtractTextPlugin(
      path.join('css', util.format('[name].%s.css', pkg.version)),
      { allChunks: true }
    )
  )
}

module.exports = plugins;
