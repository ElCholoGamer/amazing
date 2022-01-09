import { NextApiRequest } from 'next';

export interface NextApiFileRequest extends NextApiRequest {
	file: Express.Multer.File;
}
