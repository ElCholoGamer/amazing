import { StandardHttpError } from './standard';

export class UnsupportedMediaTypeError extends StandardHttpError {
	public constructor(message = 'Unsupported media type.') {
		super(415, message);
	}
}
