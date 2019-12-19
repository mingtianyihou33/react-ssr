const nodeExternals = require('webpack-node-externals')
const path = require('path')
const merge = require('webpack-merge')
const webpackBase = require('./webpack.base')
module.exports = merge(webpackBase,
  {
    target: 'node',
    entry: './server/index.js',
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist')
    },
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            // 'isomorphic-style-loader',
            'css-loader'
          ]
        }
      ]
    }
  }
)
