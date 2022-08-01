const path = require('path'),
	  fs = require('fs'),
	  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	  CopyWebpackPlugin = require('copy-webpack-plugin'),
	  HtmlWebpackPlugin = require('html-webpack-plugin'),
	  FaviconsWebpackPlugin = require('favicons-webpack-plugin'),
	  webpack = require('webpack');

const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

// Main const
const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	assets: 'assets/'
};

const PAGES_DIR = `${PATHS.src}/pug/pages/`,
	  PAGES = fs.readdirSync(`${PAGES_DIR}`),
	  PAGE_LIVE = 'index.html';

module.exports = {
	externals: {
		paths: PATHS,
		page: PAGE_LIVE
	},
	entry: {
		app: PATHS.src
	},
	output: {
		filename: `assets/js/[name].js`,
		path: PATHS.dist
	},
	target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
	module: {
		rules: [
			{
				//Pug
			test: /\.pug$/,
			loader: "pug-loader"
			},
			{
				//JavaScript
			test: /\.js$/,
			loader: "babel-loader",
			exclude: [
				/node_modules/,
			]
			},
				// fonts and images
			{
			test: /\.(ttf|eot|woff|woff2)$/,
			type: 'asset/resource',
			generator: {
				filename: 'assets/fonts/[name][ext]'
			}
			},
			{
			test: /\.(svg|png|jpg)$/,
			type: 'asset/resource',
			generator: {
				filename: 'assets/img/[name][ext]'
			}
			},
			{
				// Css
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				{
					loader: "css-loader"
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
					loader: "css-loader"
				},
				{
					loader: "postcss-loader",
					options: {
						postcssOptions: {
							path: './postcss.config.js'
						}
					}
				}, 
				{
					loader: "sass-loader"
				},
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
			]
		}),
		new MiniCssExtractPlugin({
			filename: `assets/css/[name].css`
		}),
		new FaviconsWebpackPlugin({
			logo: './src/assets/icons/logo.svg',
			outputPath: 'assets/favicon/',
			prefix: 'assets/favicon/',
			favicons: {
				appName: 'Toxin',
				icons: {
				    appleStartup: false,
					coast: false
				}
			}
		}),
		...PAGES.map(filename => new HtmlWebpackPlugin({
			template: `${PAGES_DIR}/${filename}/${filename}.pug`,
			filename: `${filename}.html`
		})),
		new webpack.ProvidePlugin({
			$: `jquery`,
			jQuery: `jquery`,
			'window.jQuery': 'jquery'
		})
	],
	optimization: {
		minimizer: [
			"...",
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						plugins: [
							["gifsicle", { interlaced: true }],
							["jpegtran", { progressive: true }],
							["optipng", { optimizationLevel: 5 }],
							[
								"svgo",
								{
									plugins: [
										{
											name: 'preset-default',
											params: {
												overrides: {
													removeViewBox: {
														active: false
													}
												}
											}
										}
									]
								},
							],
						],
					},
				},
			}),
		],
	},
	performance: {
		maxEntrypointSize: 2048000,
		maxAssetSize: 2048000
	}
};