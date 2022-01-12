import { WALL_THRESHOLD } from 'modules/parser/constants';
import { ImageData } from 'common/types/image-data';

export function parseWalls(imageData: ImageData): boolean[][] {
	const { width, height, pixelData } = imageData;
	const noisedWalls: boolean[][] = [];

	for (let x = 0; x < width; x++) {
		noisedWalls[x] = [];

		for (let y = 0; y < height; y++) {
			const index = (y * width + x) * 4;
			const [r, g, b, a] = pixelData.slice(index, index + 4);

			if (a < WALL_THRESHOLD) {
				// Transparent pixel = Not a wall
				noisedWalls[x][y] = false;
				continue;
			}

			const luminosity = (r + g + b) / 3;
			noisedWalls[x][y] = luminosity < WALL_THRESHOLD;
		}
	}

	const walls: typeof noisedWalls = [];

	for (let x = 0; x < noisedWalls.length; x++) {
		walls[x] = [];

		for (let y = 0; y < noisedWalls[x].length; y++) {
			let neighbors = 0;

			if (x > 0 && noisedWalls[x - 1][y]) neighbors++;
			if (x < noisedWalls.length - 1 && noisedWalls[x + 1][y]) neighbors++;
			if (y > 0 && noisedWalls[x][y - 1]) neighbors++;
			if (y < noisedWalls[x].length - 1 && noisedWalls[x][y + 1]) neighbors++;

			walls[x][y] = noisedWalls[x][y] && neighbors > 1;
		}
	}

	return walls;
}
