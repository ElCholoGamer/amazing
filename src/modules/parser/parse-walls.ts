import { WALL_THRESHOLD } from 'modules/parser/constants';
import { ImageData } from 'common/types/image-data';

export function parseWalls(imageData: ImageData): boolean[][] {
	const { width, height, pixelData } = imageData;
	const walls: boolean[][] = [];

	for (let x = 0; x < width; x++) {
		walls[x] = [];

		for (let y = 0; y < height; y++) {
			const index = (y * width + x) * 4;
			const [r, g, b, a] = pixelData.slice(index, index + 4);

			if (a < WALL_THRESHOLD) {
				// Transparent pixel = Not a wall
				walls[x][y] = false;
				continue;
			}

			const luminosity = (r + g + b) / 3;
			walls[x][y] = luminosity < WALL_THRESHOLD;
		}
	}

	return walls;
}
