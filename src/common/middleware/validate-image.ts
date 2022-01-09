import { RequestHandler } from 'express';
import prettyBytes from 'pretty-bytes';
import sharp from 'sharp';

const allowedMimeTypes = ['png', 'jpeg', 'jpg', 'webp'].map(ext => `image/${ext}`);

export interface Options {
	maxSize?: number;
}

export const validateImage =
	(options: Options = {}): RequestHandler =>
	async (req, res, next) => {
		const { maxSize = -1 } = options;
		const { file } = req;

		if (!file) {
			return res.status(400).json({
				statusCode: 400,
				message: 'File missing in request body.',
			});
		}

		if (!allowedMimeTypes.includes(file.mimetype)) {
			return res.status(415).json({
				status: 415,
				message: 'Invalid image file MIME type.',
			});
		}

		if (maxSize > 0 && file.size > maxSize) {
			return res.status(413).json({
				status: 413,
				message: `Max image file size is ${prettyBytes(maxSize)}.`,
			});
		}

		next();
	};
