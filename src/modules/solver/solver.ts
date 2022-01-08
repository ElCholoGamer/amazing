import { PriorityQueue } from '../../common/utils/priority-queue';
import { Cell } from './types/cell';
import { Coordinate, CoordinateArray } from './types/coordinate';
import { MazeResult } from './types/maze-result';

export function solveMaze(cells: Cell[][], start: Coordinate, end: Coordinate): MazeResult | null {
	// A* search algorithm
	cells[start.x][start.y].distance = 0;
	cells[start.x][start.y].rootDistance = 0;

	for (let x = 0; x < cells.length; x++) {
		for (let y = 0; y < cells[x].length; y++) {
			cells[x][y].manhattanD = 2 * Math.abs(end.x - x) + Math.abs(end.y - y);
		}
	}

	const queue = new PriorityQueue<Cell>();
	queue.enqueue(cells[start.x][start.y], 0);

	while (queue.size) {
		const cell = queue.dequeueLowest()!;
		cell.visited = true;

		if (cell.x === end.x && cell.y === end.y) {
			// Reached the end
			const steps: CoordinateArray[] = [];

			let current = cell;
			while (current.parent) {
				steps.unshift([current.x, current.y]);
				current = current.parent;
			}

			return {
				steps,
				distance: cell.distance,
			};
		}

		for (const neighbor of cell.neighbors) {
			if (neighbor.visited) continue;

			neighbor.rootDistance = Math.min(neighbor.rootDistance, cell.rootDistance + 1);
			const minDistance = Math.min(neighbor.distance, neighbor.rootDistance + neighbor.manhattanD);

			const neighborNode = queue.findNode(neighbor);

			if (minDistance !== neighbor.distance) {
				neighbor.distance = minDistance;
				neighbor.parent = cell;

				if (neighborNode) {
					queue.setNodePriority(neighborNode, minDistance);
				}
			}

			if (!neighborNode) {
				queue.enqueue(neighbor, neighbor.distance);
			}
		}
	}

	return null;
}
