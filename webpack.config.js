const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        app: "./src/index.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, './dist'),
        publicPath: "/dist"
    },
    devServer: {
        overlay: true,
        contentBase: "./src"
    }, 
    module: {
        rules: [
            {
            test: /\.js$/,
            loader: "babel-loader",
            exclude: [
                /node_modules/,
            ]
            }, 
            {
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: "css-loader",
                    options: { sourceMap: true }
                },
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                require("autoprefixer"),
                                require("cssnano")({
                                    preset: [
                                        "default",
                                        {
                                        discardComments: { removeAll: true, }
                                        }
                                    ]
                                })
                            ]
                        }
                    }
                }
            ]
                
            },
            {
            test: /\.sass$/,
            use: [
                'style-loader',
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
                            plugins: [
                                require("autoprefixer"),
                                require("cssnano")({
                                    preset: [
                                        "default",
                                        {
                                        discardComments: { removeAll: true, }
                                        }
                                    ]
                                })
                            ]
                        }
                    }
                }
            ]
                
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
   }
};

