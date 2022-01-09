export class HttpError extends Error {
	public constructor(
		public readonly statusCode: number,
		message: string,
		public readonly responseBody: Readonly<Record<string, any>>
	) {
		super(message);
	}
}
