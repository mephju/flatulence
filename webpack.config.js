var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: "./es6/index.js",
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'es6')
      }
    ]
  },
  devServer: {
    hot: true,
    port: 8090,
    inline: true,
    historyApiFallback: true,
  },
  output: {
    path: path.resolve('./lib'),
    filename: 'main.js',
    libraryTarget: 'umd',
    library: 'flatulence'
  }
}