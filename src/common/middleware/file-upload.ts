import { BadRequestError } from 'modules/api/errors/bad-request';
import { RequestHandler } from 'express';
import multer, { MulterError } from 'multer';

const upload = multer();

export function fileUpload(fieldName: string): RequestHandler {
	const handler = upload.single(fieldName);

	return (req, res, next) => {
		handler(req, res, err => {
			if (err) {
				if (err instanceof MulterError && err.code === 'LIMIT_UNEXPECTED_FILE') {
					return next(new BadRequestError('Unexpected file.'));
				}

				return next(err);
			}

			if (!req.file) {
				return next(new BadRequestError(`${fieldName} file must be present.`));
			}

			next();
		});
	};
}
