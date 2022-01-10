import { Coordinate } from 'common/types/coordinate';
import { StorageFolder } from './constants';
import { Result } from './models/result';
import { IResult } from './schemas/result';
import { uploadImage, uploadThumbnail } from './image';

export async function createResult(steps: Coordinate[], image: Buffer): Promise<IResult> {
	const result = new Result({ steps });
	const idString = result._id.toString();

	await uploadImage(image, { public_id: idString, folder: StorageFolder.MAZES });
	await uploadThumbnail(image, { public_id: idString });

	await result.save();
	return result;
}
