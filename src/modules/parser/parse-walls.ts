import { WALL_THRESHOLD } from 'modules/parser/constants';
import { ImageData } from 'common/types/image-data';

export function parseWalls(imageData: ImageData): boolean[][] {
	const { width, height, pixelData } = imageData;
	const pixels: boolean[][] = [];

	for (let x = 0; x < width; x++) {
		pixels[x] = [];

		for (let y = 0; y < height; y++) {
			const index = (y * width + x) * 4;
			const [r, g, b, a] = pixelData.slice(index, index + 4);

			const luminosity = ((r + g + b) / 3) * (a / 255);
			pixels[x][y] = luminosity > WALL_THRESHOLD;
		}
	}

	return pixels;
}
