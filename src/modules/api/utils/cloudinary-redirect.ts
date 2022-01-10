import { NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';
import { NotFoundError } from '../errors/not-found';

export async function cloudinaryRedirect(res: NextApiResponse, imageId: string) {
	try {
		const image = await cloudinary.api.resource(imageId);
		res.redirect(image.secure_url || image.url);
	} catch (err: any) {
		if (err.error?.http_code === 404) {
			throw new NotFoundError('Image not found.');
		}

		throw err;
	}
}
