import { bufferToImageData } from 'common/utils/buffer-to-image-data';
import { Region } from 'sharp';
import { parseWalls } from './parse-walls';
import { CellCount } from './types/cell-count';

export async function detectCellCount(image: Buffer, region: Region): Promise<CellCount> {
	const imageData = await bufferToImageData(image, region);
	const walls = parseWalls(imageData);

	const lines: string[] = [];

	for (let y = 0; y < walls[0].length; y++) {
		lines.push(walls.map(column => (column[y] ? '#' : ' ')).join(''));
	}

	let rows = 0;
	let lastStartingRow: boolean[] | null = walls.map(column => column[0]).flat();

	for (let y = 1; y < walls[0].length; y++) {
		if (lastStartingRow) {
			if (walls.some((column, x) => !column[y] && lastStartingRow![x])) {
				// Wall row end
				rows++;
				lastStartingRow = null;
			}
			continue;
		}

		// Find walls that aren't preceeded by another walls
		const startingWalls = walls.map(column => column[y] && !column[y - 1]);

		if (startingWalls.includes(true)) {
			// Wall row start
			lastStartingRow = startingWalls;
		}
	}

	let columns = 0;
	let lastStartingColumn: boolean[] | null = [...walls[0]];

	for (let x = 1; x < walls.length; x++) {
		if (lastStartingColumn) {
			if (walls[x].some((wall, y) => !wall && lastStartingColumn![y])) {
				// Wall column end
				columns++;
				lastStartingColumn = null;
			}
			continue;
		}

		// Find walls that aren't preceeded by another walls
		const startingWalls = walls[x].map((wall, y) => wall && !walls[x - 1][y]);

		if (startingWalls.includes(true)) {
			// Wall column start
			lastStartingColumn = startingWalls;
		}
	}

	return { rows, columns };
}
