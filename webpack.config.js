const path = require('path');
const webpack = require('webpack');

//plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssPlugin = new ExtractTextPlugin({
	filename: '[name].[contenthash:8].css'
});
const PurifyCssPlugin = require('purifycss-webpack');
const glob = require('glob');
const Visualizer = require('webpack-visualizer-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build'),
	template: path.join(__dirname, 'index.html')
};

const prodConfig = {
	entry: {
		app: PATHS.app,
		vendor: ['react', 'react-dom', 'redux', 'react-redux', 'redux-saga', 'babel-polyfill', 'chartist']
	},
	output: {
		path: PATHS.build,
		filename: '[name].[chunkhash:8].js'
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
							cacheDirectory: true,
							presets: ['react', 'es2016', 'stage-2']
						}
					}
				]
			}			
		]
	},	
	plugins: [
		new CleanWebpackPlugin(PATHS.build),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new BabiliPlugin(),
		/*new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			exclude: [PATHS.app]
		}),*/
		//new UglifyJsPlugin({exclude: [PATHS.app]}),
		cssPlugin,
		//new PurifyCssPlugin({
		//	paths: glob.sync(`${PATHS.app}/**/*.js`, {nodir: true }),
		//	minimize: false
		//}),
		new Visualizer(),		
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
							cacheDirectory: true,
							presets: ['react', 'es2016', 'stage-2']
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