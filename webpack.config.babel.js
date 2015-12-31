import path from 'path';
import webpack from 'webpack';

const production = process.env.NODE_ENV === 'production';

export default {
  target: "web",
  context: path.join(__dirname, './src'),
  entry: {
    app: './client'
  },
  output: {
    path: path.resolve('./build'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          // This can't be loaded through .babelrc for some reason.
          plugins: ['../tools/babelRelayPlugin']
        }
      },
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.scss$/, loader: 'style!css?sourceMap!sass?includePaths[]=' + path.resolve('./node_modules')},
      {test: /\.html$/, loader: 'file?name=[path][name].[ext]'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}
    })
  ],
  devtool: production ? 'source-map' : 'inline-source-map',
  devServer: {
    contentBase: path.resolve('./build'),
    hot: true,
    inline: true,
    stats: { colors: true }
  }
};
