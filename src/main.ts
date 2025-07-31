import { Application } from './Application';
import { HTTPServer } from './server';
import { fastifyServer } from './server/fastify';

async function bootstrap() {
	const server = new HTTPServer(fastifyServer);
	await new Application(server).run();
}

bootstrap();
