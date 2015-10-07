var webpack = require('webpack')
var stages = require('./stages')

var plugins = []

if (stages.DEV) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = plugins;
