var stages = require('./stages');

var jsxLoader = {
  test: /\.jsx?$/,
  loaders: ['babel?stage=0'],
  exclude: /node_modules/
}

if (stages.DEV) {
  jsxLoader.loaders.unshift('react-hot')
}

var htmlLoader = {
  test: /\.html$/,
  loader: 'file-loader?name=[path][name].[ext]'
}

module.exports = [jsxLoader, htmlLoader];
