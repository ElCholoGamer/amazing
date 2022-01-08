import { Coordinate } from './coordinate';

export interface Cell extends Coordinate {
	visited: boolean;
	neighbors: Cell[];
	distance: number;
	rootDistance: number;
	manhattanD: number;
	parent: Cell | null;
}
