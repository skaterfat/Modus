// Webpack v4

const path = require('path');
const fs = require("fs");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const autoprefixer = require('autoprefixer');
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const webpack = require("webpack");
const SpritePlugin = require('extract-svg-sprite-webpack-plugin');

module.exports = {
	entry: [
		// main: './app/index.js',
		'./app/index.js',
		'./app/scss/styles.scss'
	],
	output: {
		path: path.resolve(__dirname, 'htdocs'),
		//filename: './js/bundle.[chunkhash].js'
		filename: './js/bundle.js'
	},
  	devtool: "source-map",
	optimization: {
		minimizer: [
			new TerserPlugin({
				sourceMap: true,
				extractComments: true
			})
		]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.svg$/,
				loader: SpritePlugin.loader
			},
			{
				test: /\.scss$/,
        		use: [
        			MiniCssExtractPlugin.loader,
        			{ 
						loader: 'css-loader',
						options: { 
							url: false,
							sourceMap: true,
							//minimize: process.env.NODE_ENV === 'production',
							//injectType: 'linkTag'
						}
					},
        			//SpritePlugin.cssLoader,
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									autoprefixer()
								],
								sourceMap: true
							}
						}
					},
					{ 
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
        		],
			},
			{
				test: /\.(jpe?g|png)$/i,
				//exclude: ["/app/android-chrome-192x192.png"), path.resolve(__dirname, "./app/android-chrome-512x512.png"),  path.resolve(__dirname, "./app/apple-touch-icon.png")],
				//exclude: /\.\/app\/.*\.png/,
				//exclude: path.join(__dirname, "dist/js"),
				loaders: [
					'file-loader',
					'webp-loader'
				]
			},
			{
				test: /\.html$/,
				include: path.resolve(__dirname, "./app/_include"),
				use: [
					{
						loader: "html-loader",
						options: {
							minimize: false,
						}
					}
				]
			},
			/*{
				test: /\.svg$/,
				use: {
		            loader: 'url-loader'
		        }
			}*/
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		}),
		new CleanWebpackPlugin({
			cleanStaleWebpackAssets: false
		}),
		new ImageminWebpWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "./css/styles.bundle.css"
		}),
		/*new ExtractTextPlugin({
			filename: './css/bundle.css',
			allChunks: false
		}),*/
		new HtmlWebpackPlugin({
    		filename: 'index.html',
			template: './app/index.html',
			minify: false,
			//chunks: ['main']
		}),
		new HtmlWebpackPlugin({
    		filename: 'product-ims.html',
			template: './app/product-ims.html',
			minify: false
		}),
		new SpritePlugin({
			filename: 'sprite.svg',
			publicPath: './htdocs/'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: './app/fonts', to: './fonts' },
				{ from: './app/img', to: './img' },
				{ from: './app/images', to: './images' },
				{ context: './app/', from: '*.png', to: './' },
				{ context: './app/', from: '*.ico', to: './' },
				{ context: './app/', from: '*.svg', to: './' },
				{ context: './app', from: '*.webmanifest', to: './' }
			]	
		})

	]

}
