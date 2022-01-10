import { StandardHttpError } from './standard';

export class NotFoundError extends StandardHttpError {
	public constructor(message = 'Not found.') {
		super(404, message);
	}
}
