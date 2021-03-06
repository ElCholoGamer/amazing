import { ImageData } from 'common/types/image-data';
import { Cell } from 'common/types/cell';
import { parseWalls } from './parse-walls';

export function parseCells(imageData: ImageData, rows: number, columns: number): Cell[][] {
	const walls = parseWalls(imageData);

	function rangeClear(x1: number, y1: number, x2: number, y2: number) {
		if (x1 > x2) [x1, x2] = [x2, x1];
		if (y1 > y2) [y1, y2] = [y2, y1];

		for (let x = x1; x <= x2; x++) {
			if (x < 0 || x >= walls.length) return false;

			for (let y = y1; y <= y2; y++) {
				if (y < 0 || y >= walls[x].length || walls[x][y]) {
					return false;
				}
			}
		}

		return true;
	}

	const cells: Cell[][] = [...Array(columns)].map((_, x) =>
		[...Array(rows)].map((_, y) => ({
			x,
			y,
			visited: false,
			parent: null,
			neighbors: [],
			distance: Infinity,
			estimatedTotalDistance: Infinity,
			heuristic: NaN,
		}))
	);

	const cellWidth = walls.length / columns;
	const cellHeight = walls[0].length / rows;

	// Initialize neighbors
	for (let x = 0; x < columns; x++) {
		for (let y = 0; y < rows; y++) {
			const centerX = Math.round((x + 0.5) * cellWidth);
			const centerY = Math.round((y + 0.5) * cellHeight);

			const { neighbors } = cells[x][y];

			// Top
			if (y > 0 && rangeClear(centerX, centerY, centerX, Math.round(centerY - cellHeight)))
				neighbors.push(cells[x][y - 1]);

			// Bottom
			if (y < rows - 1 && rangeClear(centerX, centerY, centerX, Math.round(centerY + cellHeight)))
				neighbors.push(cells[x][y + 1]);

			// Right
			if (x > 0 && rangeClear(centerX, centerY, Math.round(centerX - cellWidth), centerY))
				neighbors.push(cells[x - 1][y]);

			// Left
			if (x < columns - 1 && rangeClear(centerX, centerY, Math.round(centerX + cellWidth), centerY))
				neighbors.push(cells[x + 1][y]);
		}
	}

	return cells;
}
