import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

export const clientRoutes: FastifyPluginAsyncZod = async (server) => {
	server.get('/', (_request, reply) => {
		reply.view('index.ejs', { title: 'Home' });
	});
};
