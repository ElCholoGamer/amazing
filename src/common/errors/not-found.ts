export class NotFoundError extends Error {
	public constructor(message = 'Page not found.') {
		super(message);
	}
}
