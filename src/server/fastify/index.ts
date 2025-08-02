import fastifyFormbody from '@fastify/formbody';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import Fastify from 'fastify';
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { fastifyStaticConfig } from './configs/fastifyStatic';
import { fastifyViewConfig } from './configs/fastifyView';
import { loggerConfig } from './configs/logger';
import { errorHandler } from './plugins/errorHandler';
import { apiRoutes } from './routes/api';
import { clientRoutes } from './routes/client';
import { newsletterRoutes } from './routes/newsletters';

export const fastifyServer = Fastify({
	logger: loggerConfig,
}).withTypeProvider<ZodTypeProvider>();

fastifyServer.setValidatorCompiler(validatorCompiler);
fastifyServer.setSerializerCompiler(serializerCompiler);

fastifyServer.register(fastifyFormbody);

fastifyServer.register(fastifyStatic, fastifyStaticConfig);

fastifyServer.register(fastifyView, fastifyViewConfig);

fastifyServer.register(newsletterRoutes);
fastifyServer.register(clientRoutes);
fastifyServer.register(apiRoutes);

fastifyServer.register(errorHandler);
