import sharp, { Region } from 'sharp';
import { ImageData } from '../types/image-data';

export async function bufferToImageData(buffer: Buffer, region?: Region): Promise<ImageData> {
	const sharpInstance = sharp(buffer);
	if (region) sharpInstance.extract(region);

	const pixelBuffer = await sharpInstance.ensureAlpha().raw().toBuffer();

	let width: number;
	let height: number;

	if (region) {
		width = region.width;
		height = region.height;
	} else {
		const metadata = await sharp(buffer).metadata();
		if (!metadata.width || !metadata.height)
			throw new Error('Could not extract image size metadata');

		width = metadata.width;
		height = metadata.height;
	}

	return {
		width,
		height,
		pixelData: new Uint8ClampedArray(pixelBuffer),
	};
}
