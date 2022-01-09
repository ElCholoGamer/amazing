import { NextFunction, RequestHandler, Response } from 'express';
import multer, { MulterError } from 'multer';

function handleError(err: any, res: Response, next: NextFunction) {
	if (!(err instanceof MulterError)) return next(err);

	if (err.code === 'LIMIT_UNEXPECTED_FILE') {
		res.status(400).json({
			statusCode: 400,
			message: err.message,
		});
	} else {
		res.status(500).json({
			statusCode: 500,
			message: err.message,
		});
	}
}

const upload = multer();

export function fileUpload(fieldName: string): RequestHandler {
	const handler = upload.single(fieldName);

	return (req, res, next) => {
		handler(req, res, err => {
			if (err) return handleError(err, res, next);

			if (!req.file) {
				return res.status(400).json({
					statusCode: 400,
					error: `File field ${fieldName} must be present.`,
				});
			}

			next();
		});
	};
}
