import { load } from 'cheerio';
import { describe, expect, it } from 'vitest';
import { fastifyServer } from '@/server/fastify';

describe('Newsletter routes', () => {
	describe('POST /newsletters/subscribe', () => {
		it('should redirect to the success page on valid subscription', async () => {
			const formData = { email: 'email@email.com' };
			const postResponse = await fastifyServer.inject({
				method: 'POST',
				url: '/newsletters/subscribe',
				headers: {
					'content-type': 'application/x-www-form-urlencoded',
				},
				payload: `email=${formData.email}`,
			});

			expect(postResponse.statusCode).toBe(302);
			expect(postResponse.headers.location).toBe('/newsletters/subscribed');

			const getResponse = await fastifyServer.inject({
				method: 'GET',
				url: postResponse.headers.location,
			});

			const $ = load(getResponse.payload);
			const h1 = $('h1');
			expect(h1.length).toBe(1);
			expect(h1.text()).toBe('Almost there!');
			expect(getResponse.statusCode).toBe(200);
		});

		it('should return status code 400 and error message when email is invalid', async () => {
			const invalidEmail = 'invalid-email';

			const response = await fastifyServer.inject({
				method: 'POST',
				url: '/newsletters/subscribe',
				headers: {
					'content-type': 'application/x-www-form-urlencoded',
				},
				payload: `email=${invalidEmail}`,
			});

			expect(response.statusCode).toBe(400);
			expect(response.json()).toEqual({
				code: 'FST_ERR_VALIDATION',
				error: 'Bad Request',
				message: 'body/email Invalid email address',
				statusCode: 400,
			});
		});
	});
});
