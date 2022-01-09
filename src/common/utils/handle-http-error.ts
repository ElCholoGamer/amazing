import { HttpError } from 'common/errors/http';
import { NextApiRequest, NextApiResponse } from 'next';

export function handleHttpError(error: HttpError, req: NextApiRequest, res: NextApiResponse) {
	res.status(error.statusCode).json(error.responseBody);
}
