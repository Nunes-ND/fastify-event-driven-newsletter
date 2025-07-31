import type { FastifyInstance } from 'fastify';

export class HTTPServer {
	private readonly PORT = Number(process.env.PORT) || 8080;
	private readonly HOST = '0.0.0.0';
	fastify: FastifyInstance;

	constructor(fastifyServer: FastifyInstance) {
		this.fastify = fastifyServer;
	}

	async start() {
		try {
			await this.fastify.listen({ port: this.PORT, host: this.HOST });
			if (process.env.NODE_ENV === 'development') {
				this.fastify.log.info(
					this.fastify.printRoutes({ commonPrefix: false }),
				);
			}
			this.registerShutdownHandlers();
			return this.fastify;
		} catch (error) {
			this.fastify.log.error('Failed to start server:', error);
			process.exit(1);
		}
	}

	private registerShutdownHandlers() {
		const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
		for (const signal of signals) {
			process.on(signal, () => {
				this.fastify.log.info(`Received ${signal}, initiating shutdown...`);
				this.shutdown();
			});
		}
	}

	private async shutdown() {
		try {
			this.fastify.log.info('Shutting down gracefully...');
			await this.fastify.close();
			this.fastify.log.info('Server closed.');
			process.exit(0);
		} catch (error) {
			this.fastify.log.error('Error during shutdown:', error);
			process.exit(1);
		}
	}
}
