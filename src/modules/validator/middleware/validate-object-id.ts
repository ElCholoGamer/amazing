import { Request, RequestHandler } from 'express';
import { isValidObjectId } from 'mongoose';

export interface Options {
	onFail?: RequestHandler;
}

export const validateObjectId = (
	idProvider: (req: Request) => any,
	options: Options = {}
): RequestHandler => {
	options.onFail ||= (req, res) => {
		res.status(400).json({
			statusCode: 400,
			message: 'Invalid object ID',
		});
	};

	return (req, res, next) => {
		const id = idProvider(req);

		if (!isValidObjectId(id)) {
			return options.onFail!(req, res, next);
		}

		next();
	};
};
