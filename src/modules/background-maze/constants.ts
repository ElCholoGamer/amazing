import { Coordinate } from 'common/types/coordinate';

export const CELL_SIZE = 50;

export const moves: Coordinate[] = [
	[-1, 1],
	[1, 0],
	[1, 0],
	[1, 0],
	[0, 1],
	[0, 1],
	[0, 1],
	[1, 0],
	[1, 0],
	[0, 1],
	[0, 1],
	[0, 1],
	[-1, 0],
	[0, 1],
	[0, 1],
	[0, 1],
	[0, 1],
	[1, 0],
	[1, 0],
	[1, 0],
	[0, -1],
	[0, -1],
	[1, 0],
	[1, 0],
	[1, 0],
	[0, 1],
	[0, 1],
	[0, 1],
	[-1, 0],
	[0, 1],
	[1, 0],
	[1, 0],
	[0, -1],
	[1, 0],
	[0, 1],
	[0, 1],
	[1, 0],
	[1, 0],
	[0, -1],
	[1, 0],
	[1, 0],
	[1, 0],
	[0, -1],
	[1, 0],
	[0, 1],
	[0, 1],
	[0, 1],
	[1, 0],
	[0, 1],
	[0, 1],
	[1, 0],
	[1, 0],
	[1, 0],
].map(p => ({ x: p[0] * CELL_SIZE, y: p[1] * CELL_SIZE }));
