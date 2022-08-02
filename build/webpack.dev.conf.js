const webpack = require('webpack'),
      { merge } = require('webpack-merge'),
      baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        open: true,
        contentBase: `${baseWebpackConfig.externals.paths.dist}`,
        openPage: `${baseWebpackConfig.externals.page}`,
        hot: true,
        port: 8082,
        overlay: {
            warnings: true,
            errors: true
        }
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
});

module.exports = new Promise((resolve) => {
    resolve(devWebpackConfig);
});


