import { StandardHttpError } from './standard';

export class NotFoundError extends StandardHttpError {
	public constructor(message = 'Page not found.') {
		super(404, message);
	}
}
