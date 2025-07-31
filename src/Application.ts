import type { HTTPServer } from './server';

export class Application {
	private server: HTTPServer;

	constructor(server: HTTPServer) {
		this.server = server;
	}

	async run() {
		await this.initializeDependencies();
		await this.server.start();
	}

	async initializeDependencies() {
		try {
			this.server.fastify.log.info('Initializing dependencies...');
			this.server.fastify.log.info('Dependencies initialized successfully.');
		} catch (error) {
			this.server.fastify.log.error(
				'Failed to initialize dependencies:',
				error,
			);
			throw error;
		}
	}
}
