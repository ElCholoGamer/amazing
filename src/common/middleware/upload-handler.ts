import { RequestHandler } from 'express';
import { MulterError } from 'multer';

export function uploadHandler(upload: RequestHandler): RequestHandler {
	return (req, res, next) => {
		upload(req, res, err => {
			if (!err) return next();

			if (err instanceof MulterError) {
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
			} else {
				console.error(err);
			}
		});
	};
}
