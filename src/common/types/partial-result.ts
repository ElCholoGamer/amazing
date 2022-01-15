import { Region } from 'sharp';
import { CoordinateArray } from './coordinate';

export interface PartialResult {
	id: string;
	imageRegion: Region;
	rows: number;
	columns: number;
	start: CoordinateArray;
	createdAt: Date;
}
