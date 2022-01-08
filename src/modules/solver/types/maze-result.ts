import { CoordinateArray } from './coordinate';

export interface MazeResult {
	distance: number;
	steps: CoordinateArray[];
}
