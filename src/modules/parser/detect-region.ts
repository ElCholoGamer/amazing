import { Coordinate } from 'common/types/coordinate';
import { bufferToImageData } from 'common/utils/buffer-to-image-data';
import { parseWalls } from './parse-walls';
import { Region } from 'sharp';

export async function detectMazeRegion(image: Buffer): Promise<Region> {
	const imageData = await bufferToImageData(image);
	const walls = parseWalls(imageData);

	const wallCountsV = walls.map(col => col.reduce((count, wall) => count + +wall, 0));
	const wallCountsH = [...Array(walls[0].length)].map((_, y) =>
		walls.reduce((count, col) => count + +col[y], 0)
	);

	const center: Coordinate = {
		x: Math.floor(walls.length / 2),
		y: Math.floor(walls[0].length / 2),
	};

	let left = 0;
	let leftX = 0;

	for (let x = leftX; x < center.x; x++) {
		if (wallCountsV[x] > left) {
			left = wallCountsV[x];
			leftX = x;
		}
	}

	let right = 0;
	let rightX = walls.length - 1;

	for (let x = rightX; x >= center.x; x--) {
		if (wallCountsV[x] > right) {
			right = wallCountsV[x];
			rightX = x;
		}
	}

	let top = 0;
	let topY = 0;

	for (let y = topY; y < center.y; y++) {
		if (wallCountsH[y] > top) {
			top = wallCountsH[y];
			topY = y;
		}
	}

	let bottom = 0;
	let bottomY = walls[0].length - 1;

	for (let y = bottomY; y >= center.y; y--) {
		if (wallCountsH[y] > bottom) {
			bottom = wallCountsH[y];
			bottomY = y;
		}
	}

	return {
		left: leftX,
		top: topY,
		width: rightX - leftX + 1,
		height: bottomY - topY + 1,
	};
}
