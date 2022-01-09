import { RequestHandler } from 'express';
import prettyBytes from 'pretty-bytes';

export interface Options {
	maxSize?: number;
	mimeTypes?: string[];
}

export const validateFile =
	(options: Options = {}): RequestHandler =>
	(req, res, next) => {
		const { fieldname, mimetype, size } = req.file!;

		const { maxSize = -1, mimeTypes } = options;

		if (mimeTypes && !mimeTypes.includes(mimetype)) {
			return res.status(415).json({
				status: 415,
				error: `MIME type for ${fieldname} must be one of: ${mimeTypes.join(', ')}.`,
			});
		}

		if (maxSize > 0 && size > maxSize) {
			return res.status(413).json({
				status: 413,
				error: `File size for ${fieldname} must be equal or less than ${prettyBytes(maxSize)}.`,
			});
		}

		next();
	};
