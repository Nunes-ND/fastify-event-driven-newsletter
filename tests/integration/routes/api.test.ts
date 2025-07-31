import { describe, expect, it } from 'vitest';
import { fastifyServer } from '@/server/fastify';

describe('Api routes', () => {
	describe('GET /health', () => {
		it("should return status code 200 and 'ok' status message", async () => {
			const response = await fastifyServer.inject({
				method: 'GET',
				url: '/health',
			});

			expect(response.statusCode).toBe(200);
			expect(response.json()).toEqual({ status: 'ok' });
		});
	});
});
