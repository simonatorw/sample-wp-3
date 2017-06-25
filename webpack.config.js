const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

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
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: PATHS.template
		})
	]
};

const prodConfig = {
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
	
};

const devConfig = {
	devServer: {
		historyApiFallback: true,
		stats: 'errors-only',
		host: process.env.HOST,
		port: process.env.PORT
	}
	
};

module.exports = (env) => {
	console.log('env', env);
	if (env === 'production') {
		return Object.assign({}, commonConfig, prodConfig);
	} else if (env === 'development') {
		return Object.assign({}, commonConfig, devConfig);
	}
	
};