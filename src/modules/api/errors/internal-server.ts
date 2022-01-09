import { StandardHttpError } from './standard';

export class InternalServerError extends StandardHttpError {
	public constructor(message = 'Internal server error.') {
		super(500, message);
	}
}
