import { NextApiRequest } from 'next';

interface NextApiFileRequest extends NextApiRequest {
	file?: Express.Multer.File;
}

export default NextApiFileRequest;
