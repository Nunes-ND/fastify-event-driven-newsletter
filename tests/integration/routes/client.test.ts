import { load } from 'cheerio';
import { describe, expect, it } from 'vitest';
import { fastifyServer } from '@/server/fastify';

describe('Client routes', () => {
	describe('GET /', () => {
		it('should return status code 200 and render the h1 tag correctly', async () => {
			const response = await fastifyServer.inject({
				method: 'GET',
				url: '/',
			});
			const $ = load(response.payload);
			const h1 = $('h1');

			expect(response.statusCode).toBe(200);
			expect(h1.length).toBe(1);
			expect(h1.text()).toBe('Join Our Newsletter');
		});
	});
});
