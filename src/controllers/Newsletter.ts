import { subscriptionService } from '@/services/Subscription';

class NewsletterController {
	subscribe(email: string) {
		const result = subscriptionService.subscribe(email);
		return result;
	}
}

export const newsletterController = new NewsletterController();
