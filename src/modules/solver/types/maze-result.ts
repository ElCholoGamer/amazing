import { CoordinateArray } from '../../../common/types/coordinate';

export interface MazeResult {
	distance: number;
	steps: CoordinateArray[];
}
