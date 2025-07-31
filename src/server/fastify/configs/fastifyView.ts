import path from 'node:path';

export const fastifyViewConfig = {
	engine: {
		ejs: require('ejs'),
	},
	root: path.join(__dirname, '..', '..', '..', 'views'),
	layout: './templates/layout.ejs',
	viewExt: 'ejs',
	defaultContext: {
		dev: process.env.NODE_ENV === 'development',
	},
};
