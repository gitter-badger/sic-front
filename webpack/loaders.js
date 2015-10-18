var util = require('util');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var pkg = require('../package.json');
var stages = require('./stages');

var jsxLoader = (function(){
  var ldr = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['babel?stage=0']
  };

  if (stages.DEV) {
    ldr.loaders.unshift('react-hot')
  }

  return ldr;
})();

var htmlLoader = {
  test: /\.html$/,
  loaders: [
    'file?name=[path][name].[ext]',
    util.format('template-html?raw=true&engine=lodash&version=%s&debug=%s', pkg.version, stages.DEV)
  ]
}

var cssLoader = {
   test: /\.css$/,
   loader: stages.DEV ? 'style!css?sourceMap' : ExtractTextPlugin.extract('style', 'css')
}

var sassLoader = (function(){
  var sassParams = 'includePaths[]=' + path.resolve(__dirname, '../node_modules')
  return {
    test: /\.sass$/,
    loader: stages.DEV ? 'style!css?sourceMap!sass?' + sassParams : ExtractTextPlugin.extract('style', 'css', 'sass?' + sassParams)
  }
})();

module.exports = [jsxLoader, htmlLoader, cssLoader, sassLoader];
