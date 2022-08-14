const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    open: true,
    contentBase: `${baseWebpackConfig.externals.paths.dist}`,
    openPage: `${baseWebpackConfig.externals.page}`,
    hot: true,
    port: 8082,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});

module.exports = new Promise((resolve) => {
  resolve(devWebpackConfig);
});
