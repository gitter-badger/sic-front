import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const production = process.env.NODE_ENV === 'production';

export default {
  entry: './src/client',
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          // This can't be loaded through .babelrc for some reason.
          plugins: ['./tools/babelRelayPlugin']
        }
      },
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.scss$/, loader: 'style!css?sourceMap!sass?includePaths[]=' + path.resolve('./node_modules')}
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}
    }),
    new HtmlWebpackPlugin({
      title: 'Relay • TodoMVC'
    })
  ],
  devtool: production ? 'source-map' : 'inline-source-map',
  devServer: {
    contentBase: './build'
  }
};