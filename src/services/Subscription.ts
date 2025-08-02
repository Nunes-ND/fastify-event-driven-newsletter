import { Subscription } from '@/models/Subscription';

class SubscriptionService {
	subscribe(email: string) {
		try {
			new Subscription(email);
			return { isSubscribed: true, error: null };
		} catch (error: unknown) {
			const message =
				error instanceof Error ? error.message : 'An unknown error occurred';
			return { isSubscribed: false, error: message };
		}
	}
}

export const subscriptionService = new SubscriptionService();
