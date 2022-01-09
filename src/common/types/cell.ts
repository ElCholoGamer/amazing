import { Coordinate } from './coordinate';

export interface Cell extends Coordinate {
	visited: boolean;
	parent: Cell | null;
	neighbors: Cell[];
	distance: number;
	estimatedTotalDistance: number;
	heuristic: number;
}
