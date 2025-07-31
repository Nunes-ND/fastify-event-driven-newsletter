import { Application } from './Application';
import { HTTPServer } from './server';
import { fastifyServer } from './server/fastify';

async function bootstrap() {
	const { fastify } = new HTTPServer(fastifyServer);
	await new Application(fastify).run();
}

bootstrap();
