import { PriorityQueue } from '@common/utils/priority-queue';
import { Cell } from '@common/types/cell';
import { Coordinate } from '@common/types/coordinate';
import { MazeResult } from './types/maze-result';
import { traceBack } from './trace-back';

export function aStar(cells: Cell[][], start: Coordinate, end: Coordinate) {
	// A* search algorithm
	cells[start.x][start.y].estimatedTotalDistance = 0;
	cells[start.x][start.y].distance = 0;

	for (let x = 0; x < cells.length; x++) {
		for (let y = 0; y < cells[x].length; y++) {
			cells[x][y].heuristic = Math.abs(end.x - x) + Math.abs(end.y - y);
		}
	}

	const queue = new PriorityQueue<Cell>();
	queue.enqueue(cells[start.x][start.y], 0);

	while (queue.size) {
		const cell = queue.dequeueLowest()!;
		cell.visited = true;

		if (cell.x === end.x && cell.y === end.y) {
			return;
		}

		const nextDistance = cell.distance + 1;

		for (const neighbor of cell.neighbors) {
			if (neighbor.visited) continue;

			const neighborNode = queue.findNode(neighbor);

			if (!neighborNode) {
				queue.enqueue(neighbor, neighbor.estimatedTotalDistance);
			}

			if (neighborNode || nextDistance < neighbor.distance) {
				neighbor.parent = cell;
				neighbor.distance = nextDistance;
				neighbor.estimatedTotalDistance = nextDistance + neighbor.heuristic;
			}
		}
	}
}
