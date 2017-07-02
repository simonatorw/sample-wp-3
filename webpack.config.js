const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssPlugin = new ExtractTextPlugin({
	filename: '[name].css'
});
const PurifyCssPlugin = require('purifycss-webpack');
const glob = require('glob');

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build'),
	template: path.join(__dirname, 'index.html')
};

const prodConfig = {
	entry: {
		app: PATHS.app,
		vendor: ['react', 'react-dom']
	},
	output: {
		path: PATHS.build,
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: cssPlugin.extract({
					use: ['css-loader', 'postcss-loader'],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true
						}
					}
				]
			}			
		]
	},	
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		cssPlugin,
		new PurifyCssPlugin({
			paths: glob.sync(`${PATHS.app}/**/*.js`, {nodir: true }),
			minimize: true
		}),
		new HtmlWebpackPlugin()
		
	]
};

const devConfig = {
	entry: {
		app: PATHS.app
	},
	output: {
		path: PATHS.build,
		filename: '[name].js'
	},	
	module: {
		rules: [	
			{
				test: /\.js$/,
				enforce: 'pre',
				loader: 'eslint-loader',
				options: {
					emitWarning: true
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader', 
					{ loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } }, 
					'postcss-loader'
				]
			},
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true
						}
					}
				]
			}			
		]
	},
	devServer: {
		historyApiFallback: true,
		stats: 'errors-only',
		host: process.env.HOST,
		port: process.env.PORT,
		overlay: {
			errors: true,
			warnings: true
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: PATHS.template
		})
	]	
};

module.exports = (env) => {
	console.log('env', env);
	if (env === 'production') {
		return prodConfig;
	} else if (env === 'development') {
		return devConfig;
	}
	
};