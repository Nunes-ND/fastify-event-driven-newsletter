import { randomBytes } from 'node:crypto';

export class Subscription {
	readonly email: string;
	private status: 'PENDING' | 'CONFIRMED';
	private token: string;
	private createdAt: Date;
	private updatedAt: Date;

	constructor(email: string) {
		this.validate(email);
		this.email = email;
		this.status = 'PENDING';
		this.token = this.generateToken();
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	private validate(email: string) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			throw new Error('Invalid email address');
		}
	}

	confirm() {
		this.updatedAt = new Date();
		this.status = 'CONFIRMED';
	}

	getStatus() {
		return this.status;
	}

	private generateToken() {
		return randomBytes(16).toString('hex');
	}

	getToken() {
		return this.token;
	}

	getCreatedAt() {
		return this.createdAt;
	}

	getUpdatedAt() {
		return this.updatedAt;
	}
}
