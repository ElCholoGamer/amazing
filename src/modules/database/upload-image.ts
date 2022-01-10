import { UploadApiOptions, UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { THUMBNAIL_SIZE } from './constants';

export const uploadImage = (image: Buffer, options?: UploadApiOptions) =>
	new Promise<UploadApiResponse>((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream(
			{ format: 'png', ...options },
			(err, result) => {
				if (result) {
					resolve(result);
				} else {
					reject(err);
				}
			}
		);

		Readable.from(image).pipe(stream);
	});

export const uploadThumbnail = (image: Buffer, options?: UploadApiOptions) =>
	uploadImage(image, {
		folder: 'thumbnails',
		transformation: {
			width: THUMBNAIL_SIZE.width,
			height: THUMBNAIL_SIZE.height,
			crop: 'fill',
		},
		...options,
	});
