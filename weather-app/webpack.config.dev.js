const {merge} = require('webpack-merge')

const baseConfig = require('./webpack.config')

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 8080,
  },
  devtool: 'source-map',
})
