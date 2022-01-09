import { Coordinate } from 'common/types/coordinate';
import { bufferToImageData } from 'common/utils/buffer-to-image-data';
import { parseCells } from 'modules/parser/parse-cells';
import { aStar } from './a-star';
import { SolveOptions } from './types/solve-options';

export async function solveMaze(
	imageBuffer: Buffer,
	options: SolveOptions
): Promise<Coordinate[] | null> {
	const { left, top, width, height, rows, columns, start, end } = options;

	const imageData = await bufferToImageData(imageBuffer, { left, top, width, height });
	const cells = parseCells(imageData, Number(rows), Number(columns));

	aStar(cells, start, end);

	const endCell = cells[end.x][end.y];
	if (!endCell.visited) return null;

	const steps: Coordinate[] = [];

	let current = endCell;
	while (current.parent) {
		steps.unshift({ x: current.x, y: current.y });
		current = current.parent;
	}

	return steps;
}
