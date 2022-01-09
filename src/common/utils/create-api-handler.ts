import nc, { NextConnect, Options } from 'next-connect';
import { HttpError } from 'common/errors/http';
import { InternalServerError } from 'common/errors/http/internal-server';
import { NotFoundError } from 'common/errors/http/not-found';
import { NextApiRequest, NextApiResponse } from 'next';
import { handleHttpError } from './handle-http-error';

export function createApiHandler<
	Req extends NextApiRequest = NextApiRequest,
	Res extends NextApiResponse = NextApiResponse
>(options: Options<Req, Res> = {}): NextConnect<Req, Res> {
	options.onError ||= (err, req: Req, res: Res) => {
		if (err instanceof HttpError) {
			return handleHttpError(err, req, res);
		}

		console.error(err);
		handleHttpError(new InternalServerError(), req, res);
	};

	options.onNoMatch ||= (req: Req, res: Res) => {
		handleHttpError(new NotFoundError(), req, res);
	};

	const handler = nc(options);
	return handler;
}
