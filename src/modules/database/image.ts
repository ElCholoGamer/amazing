import { UploadApiOptions, UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { StorageFolder, THUMBNAIL_SIZE } from './constants';

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
		folder: StorageFolder.THUMBNAILS,
		transformation: {
			width: THUMBNAIL_SIZE.width,
			height: THUMBNAIL_SIZE.height,
			crop: 'fill',
		},
		...options,
	});

export async function getImageUrl(imageId: string, secureOnly = false): Promise<string | null> {
	try {
		const { secure_url, url } = await cloudinary.api.resource(imageId);
		if (!secure_url && secureOnly) return null;

		return secure_url || url;
	} catch (err: any) {
		if (err.error?.http_code === 404) {
			return null;
		}

		throw err;
	}
}
