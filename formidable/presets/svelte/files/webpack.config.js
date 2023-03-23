const path = require('path');

module.exports = {
    output: { chunkFilename: 'js/[name].js?id=[chunkhash]' },
	resolve: {
		alias: {
			'@': path.resolve('resources/js'),
			svelte: path.resolve('node_modules', 'svelte')
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	module: {
		rules: [
			{
				test: /\.(svelte)$/,
				use: {
					loader: 'svelte-loader'
				},
			},
		],
	},
};
