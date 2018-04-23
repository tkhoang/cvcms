var webpack = require('webpack');
'use strict';
process.traceDeprecation = true;

var path = require('path');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'adminclient', 'index.jsx');
var initPath = path.resolve(__dirname, 'initclient', 'index.jsx');

var qs = require( 'querystring');

const util = require('util');


exports.puts = util.deprecate(function() {
  for (var i = 0, len = arguments.length; i < len; ++i) {
    process.stdout.write(arguments[i] + '\n');
  }
}, 'util.puts: Use console.log instead');

module.exports = {
  devtool: '#eval-source-map',
  entry: {
    bundle:
    [
      'webpack-hot-middleware/client?reload=true&path=/admin/__webpack_hmr',
      mainPath
    ]
    ,init:
    [
      'webpack-hot-middleware/client?reload=true&path=/admin/__webpack_hmr',
      initPath
    ]

  },
  output: {
    path: buildPath,
    filename: '[name].js',
    publicPath: '/build/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      request: 'browser-request'
    }
  },
  module: {
    loaders: [
      // Javascript
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          "env": {
            "development": {
              "presets": ['react-hmre','es2015' ,'stage-0'],
              "plugins": [
                ["react-transform", {
                  "transforms": [{
                    "transform": 'react-transform-hmr',
                    "imports": ['react'],
                    "locals": ['module']
                  }]
                }]
              ]
            }
          },
        }
      },

      // CSS
      {
        test: /\.css$/,
        include: path.join(buildPath, 'client'),
        loader: 'style-loader!css-loader?' + qs.stringify({
          modules: true,
          importLoaders: 1,
          localIdentName: '[path][name]-[local]'
        })
      },
      { test: /\.ya?ml$/, loader: 'json-loader!yaml-loader' }

    ]
  }
};
