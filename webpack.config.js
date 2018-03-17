const path = require('path');

module.exports = {
	entry: './app.js',
	mode: 'development',
	output: {
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000
	}
};
