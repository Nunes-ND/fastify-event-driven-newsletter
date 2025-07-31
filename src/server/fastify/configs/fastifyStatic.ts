import path from 'node:path';

export const fastifyStaticConfig = {
	root: path.join(__dirname, '..', '..', '..', 'public'),
	prefix: '/',
};
