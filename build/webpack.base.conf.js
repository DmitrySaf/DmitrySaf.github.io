const path = require('path'),
      fs = require('fs'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      FaviconsWebpackPlugin = require('favicons-webpack-plugin');

// Main const
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
};

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: "/"
    },
    devServer: {
        overlay: true,
        contentBase: "./src"
    }, 
    module: {
        rules: [
            {
                //JavaScript
            test: /\.js$/,
            loader: "babel-loader",
            exclude: [
                /node_modules/,
            ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: `${PATHS.assets}fonts/[hash][ext][query]`
                }
            },
            {
                // Css
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: { sourceMap: true }
                },
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            path: './postcss.config.js'
                        }
                    }
                }
            ]
                
            },
            {
                // Sass
            test: /\.sass$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: { sourceMap: true }
                }, 
                {
                    loader: "sass-loader",
                    options: { sourceMap: true } 
                },
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            path: './postcss.config.js'
                        }
                    }
                }
            ]
                
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${PATHS.src}/${PATHS.assets}img`,
                    to: `${PATHS.assets}img`
                },
                {
                    from: `${PATHS.src}/${PATHS.assets}icons`,
                    to: `${PATHS.assets}icons`
                }
        ]}),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`
        }),
        new FaviconsWebpackPlugin({
            logo: './src/assets/icons/logo.svg',
            outputPath: './assets/favicon'
        }),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: './index.html'
        })
    ],
    performance: {
        maxEntrypointSize: 2048000,
        maxAssetSize: 2048000
    }
};