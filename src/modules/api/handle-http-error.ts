import { HttpError } from 'modules/api/errors/http-error';
import { NextApiRequest, NextApiResponse } from 'next';

export function handleHttpError(error: HttpError, req: NextApiRequest, res: NextApiResponse) {
	res.status(error.statusCode).json(error.responseBody);
}
