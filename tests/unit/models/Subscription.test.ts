import { describe, expect, it, vi } from 'vitest';
import { Subscription } from '@/models/Subscription';

describe('Subscription', () => {
	it('should create a subscription entity', () => {
		const email = 'email@example.com';
		const subscription = new Subscription(email);

		expect(subscription).toMatchObject({
			email: expect.any(String),
			status: 'PENDING',
			token: expect.any(String),
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
		});
	});

	it('should update the status to "CONFIRMED" and the updatedAt timestamp', () => {
		vi.useFakeTimers();
		const subscription = new Subscription('email@example.com');
		const createdAt = subscription.getCreatedAt();

		vi.advanceTimersByTime(1000);
		subscription.confirm();

		expect(subscription.getStatus()).toBe('CONFIRMED');
		expect(subscription.getUpdatedAt().getTime()).toBeGreaterThan(
			createdAt.getTime(),
		);

		vi.useRealTimers();
	});

	it('should generate a token', () => {
		const subscription = new Subscription('email@example.com');

		expect(subscription.getToken()).toHaveLength(32);
	});

	it('should throw an error if the email is invalid', () => {
		const email = 'invalid-email';

		expect(() => new Subscription(email)).toThrowError('Invalid email address');
	});
});
