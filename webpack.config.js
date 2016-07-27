module.exports = {
	entry: "./source/components/app/app.js",
	output: {
		filename: '[name].js',
		path: 'public/',
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel',
				query: {
					presets: ['es2015']
				}
			},
			{ test: /\.jade$/, loader: "jade" }
		]
	}
};