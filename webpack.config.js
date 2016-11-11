module.exports = {
	entry   : './front-end/index.js',
	output  : {
		path     : __dirname + '/public/js',
		filename : 'bundle.js',
		publicPath : '/js'
	},
	module  : {
		loaders : [
			{
				test     : /\.js$/,
				exclude  : /node_modules/,
				loaders  : ['babel']
			}
		]
	},
	devServer : {
		contentBase : './public'
	}
};