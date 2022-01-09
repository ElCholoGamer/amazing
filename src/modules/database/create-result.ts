import { Coordinate } from 'common/types/coordinate';
import { Result } from './models/result';
import { IResult } from './schemas/result';

export async function createResult(steps: Coordinate[]): Promise<IResult> {
	const result = new Result({ steps });
	await result.save();

	return result;
}
