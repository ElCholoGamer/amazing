import { Cell } from '../../common/types/cell';
import { Coordinate } from '../../common/types/coordinate';

export function traceBack(from: Cell): Coordinate[] {
	const steps: Coordinate[] = [];

	let current = from;
	while (current.parent) {
		steps.unshift({ x: current.x, y: current.y });
		current = current.parent;
	}

	return steps;
}
