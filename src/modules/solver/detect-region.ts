import { Coordinate } from 'common/types/coordinate';
import { bufferToImageData } from 'common/utils/buffer-to-image-data';
import { parseWalls } from 'modules/parser/parse-walls';
import { Region } from 'sharp';

export async function detectMazeRegion(image: Buffer): Promise<Region> {
	const imageData = await bufferToImageData(image);
	const wallData = parseWalls(imageData);

	const wallCountsV = wallData.map(col => col.reduce((count, wall) => count + +!wall, 0));
	const wallCountsH = [...Array(wallData[0].length)].map((_, y) =>
		wallData.reduce((count, col) => count + +!col[y], 0)
	);

	console.log(wallData.map(col => col[0]).flat());

	const center: Coordinate = {
		x: Math.floor(wallData.length / 2),
		y: Math.floor(wallData[0].length / 2),
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
	let rightX = wallData.length - 1;

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
	let bottomY = wallData[0].length - 1;

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
