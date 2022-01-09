import { StandardHttpError } from './standard';

export class PayloadTooLargeError extends StandardHttpError {
	public constructor(message = 'Payload too large.') {
		super(413, message);
	}
}
