const path = require('path')
const merge = require('webpack-merge')
const webpackBase = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = merge(webpackBase,
  {
    entry: './client/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public'),
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localsConvention: 'camelCase'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.csr.html',
        template: 'src/index.csr.html'
      })
    ]
  }
)
