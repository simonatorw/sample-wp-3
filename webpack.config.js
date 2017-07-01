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

const commonConfig = {
	entry: {
		app: PATHS.app
	},
	output: {
		path: PATHS.build,
		filename: '[name].js'
	}
};

const prodConfig = {
	module: {
		rules: [
			{
				test: /\.css$/,
				use: cssPlugin.extract({
					use: ['css-loader', 'postcss-loader'],
					fallback: 'style-loader'
				})
			}
		]
	},	
	plugins: [
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
		return Object.assign({}, commonConfig, prodConfig);
	} else if (env === 'development') {
		return Object.assign({}, commonConfig, devConfig);
	}
	
};