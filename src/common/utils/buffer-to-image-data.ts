import sharp, { Region } from 'sharp';
import { ImageData } from '../types/image-data';

export async function bufferToImageData(buffer: Buffer, region: Region): Promise<ImageData> {
	const pixelBuffer = await sharp(buffer).extract(region).ensureAlpha().raw().toBuffer();

	return {
		width: region.width,
		height: region.height,
		pixelData: new Uint8ClampedArray(pixelBuffer),
	};
}
