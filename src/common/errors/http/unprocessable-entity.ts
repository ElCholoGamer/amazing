import { StandardHttpError } from './standard';

export class UnprocessableEntityError extends StandardHttpError {
	public constructor(message = 'Unprocessable entity.') {
		super(422, message);
	}
}
