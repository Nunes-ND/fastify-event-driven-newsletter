import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { newsletterController } from '@/controllers/Newsletter';

export const newsletterRoutes: FastifyPluginAsyncZod = async (server) => {
	server.post(
		'/newsletters/subscribe',
		{
			schema: {
				body: z.object({
					email: z.email(),
				}),
			},
		},
		(request, reply) => {
			const { email } = request.body;
			const { isSubscribed, error } = newsletterController.subscribe(email);
			if (!isSubscribed && error) {
				return reply.status(400).view('index.ejs', {
					title: 'Home',
					email: email,
					error: error,
				});
			}
			return reply.status(302).redirect('/newsletters/subscribed');
		},
	);

	server.get('/newsletters/subscribed', (_request, reply) => {
		return reply.view('subscriptionPending.ejs', {
			title: 'Subscription Pending',
		});
	});
};
