const path = require('path')
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const vendors = [
	'vue',
	'vue-router',
	'axios',
	'element-ui',
  'vuex',
  'vue-i18n'
];

// console.log(__dirname, 'path');
module.exports = {
	output: {
		path: path.join(__dirname, '../dll'),
		filename: '[name].js',
		library: '[name]'
	},
	entry: {
		'lib': vendors
	},
	plugins: [

		new CleanWebpackPlugin(
		  ['../dll'],
		  {
			verbose: false, //
			allowExternal: true
		  }
		),

		new webpack.DllPlugin({
			path: './dll/manifest.json',
			name: '[name]',
			context: __dirname
		}),
		new UglifyJsPlugin({
			uglifyOptions: {
				compress: {
					warnings: false
				}
			}
		})
	]
}
