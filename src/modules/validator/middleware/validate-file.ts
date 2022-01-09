import { PayloadTooLargeError } from 'common/errors/http/payload-too-large';
import { UnsupportedMediaTypeError } from 'common/errors/http/unsupported-media-type';
import { RequestHandler } from 'express';
import prettyBytes from 'pretty-bytes';

export interface Options {
	maxSize?: number;
	mimeTypes?: string[];
}

export const validateFile =
	(options: Options = {}): RequestHandler =>
	(req, res, next) => {
		const { maxSize = -1, mimeTypes } = options;
		const { fieldname, mimetype, size } = req.file!;

		if (mimeTypes && !mimeTypes.includes(mimetype)) {
			throw new UnsupportedMediaTypeError(
				`MIME type for ${fieldname} must be one of: ${mimeTypes.join(', ')}.`
			);
		}

		if (maxSize > 0 && size > maxSize) {
			throw new PayloadTooLargeError(
				`File size for ${fieldname} must be equal or less than ${prettyBytes(maxSize)}.`
			);
		}

		next();
	};
