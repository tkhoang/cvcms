'use strict';
process.traceDeprecation = true;

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const util = require('util');

exports.puts = util.deprecate(function() {
  for (var i = 0, len = arguments.length; i < len; ++i) {
    process.stdout.write(arguments[i] + '\n');
  }
}, 'util.puts: Use console.log instead');


module.exports = {
  devtool: 'eval-source-map',
  entry: [
    //'webpack-hot-middleware/client?reload=true&path=/admin/__webpack_hmr',
	'webpack/hot/dev-server',
    //'webpack-hot-middleware/client?reload=true&dynamicPublicPath=true',
    path.join(__dirname, 'adminclient/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
		title: 'admin',
		template: 'adminclient/index.html',
		inject: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        "presets": ["react", "es2015", "stage-0", "react-hmre"]
      }
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$///,
      //loader: 'style-loader!css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    }]
  }
};
