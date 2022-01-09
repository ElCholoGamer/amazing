import { HttpError } from './http-error';

export class StandardHttpError extends HttpError {
	public constructor(statusCode: number, message: string) {
		super(statusCode, message, { statusCode, message });
	}
}
