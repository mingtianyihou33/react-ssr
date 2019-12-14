const path = require('path')
const merge = require('webpack-merge')
const webpackBase = require('./webpack.base')
module.exports = merge(webpackBase,
    {
        entry: './client/index.js',
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, 'public'),
        }
    }
)
