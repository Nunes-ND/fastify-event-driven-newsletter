import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

export const apiRoutes: FastifyPluginAsyncZod = async (server) => {
	server.get('/health', (_request, reply) => {
		reply.send({ status: 'ok' });
	});
};
