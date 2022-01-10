import nc, { NextConnect, Options } from 'next-connect';
import { HttpError } from 'modules/api/errors/http-error';
import { InternalServerError } from 'modules/api/errors/internal-server';
import { NotFoundError } from 'modules/api/errors/not-found';
import { NextApiResponse } from 'next';
import { handleHttpError } from './handle-http-error';
import { queryString } from './middleware/query-string';
import { NextApiQsRequest } from './types/next-api-qs-request';

export function createApiHandler<Req extends {} = {}, Res extends {} = {}>(
	options: Options<NextApiQsRequest & Req, NextApiResponse & Res> = {}
): NextConnect<NextApiQsRequest & Req, NextApiResponse & Res> {
	options.onError ||= (err, req, res) => {
		if (err instanceof HttpError) {
			return handleHttpError(err, req, res);
		}

		console.error(err);
		handleHttpError(new InternalServerError(), req, res);
	};

	options.onNoMatch ||= (req, res) => {
		handleHttpError(new NotFoundError(), req, res);
	};

	const handler = nc(options);
	handler.use(queryString());

	return handler;
}
