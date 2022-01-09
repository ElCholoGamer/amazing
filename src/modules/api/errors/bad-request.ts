import { StandardHttpError } from './standard';

export class BadRequestError extends StandardHttpError {
	public constructor(message = 'Bad request.') {
		super(400, message);
	}
}
