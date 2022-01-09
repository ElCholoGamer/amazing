import { NotFoundError } from 'common/errors/not-found';
import { NextApiRequest, NextApiResponse } from 'next';
import nc, { NextConnect, Options } from 'next-connect';

export function createApiHandler<
	Req extends NextApiRequest = NextApiRequest,
	Res extends NextApiResponse = NextApiResponse
>(options: Options<Req, Res> = {}): NextConnect<Req, Res> {
	options.onError ||= (err, req: Req, res: Res, next) => {
		if (err instanceof NotFoundError && options.onNoMatch) {
			return options.onNoMatch(req, res, next);
		}

		console.error(err);
		res.status(500).json({
			statusCode: 500,
			error: 'Internal server error.',
		});
	};

	options.onNoMatch ||= (req: Req, res: Res) => {
		res.status(404).json({
			statusCode: 404,
			error: 'Page not found.',
		});
	};

	const handler = nc(options);
	return handler;
}
