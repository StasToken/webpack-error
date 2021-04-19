var ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

module.exports = {
  entry: './public/js/main.js',
  output: {
    filename: './public/build/bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|eot|ttf|woff|woff2\?v=4.7.0|woff\?v=4.7.0|eot\?v=4.7.0|ttf\?v=4.7.0|svg\?v=4.7.0|video.play.png)$/,
        type: 'var',
        loader: 'raw-loader',
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('./public/build/bundle.css'),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ]
};
