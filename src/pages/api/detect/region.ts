import { fileUpload } from 'common/middleware/file-upload';
import { IMAGE_MIME_TYPES, MAX_IMAGE_SIZE } from 'modules/api/constants';
import { createApiHandler } from 'modules/api/create-api-handler';
import { NextApiFileRequest } from 'modules/api/types/next-api-file-request';
import { detectMazeRegion } from 'modules/parser/detect-region';
import { validateFile } from 'modules/validator/middleware/validate-file';

const handler = createApiHandler<NextApiFileRequest>();

handler.post(
	fileUpload('image'),
	validateFile({
		maxSize: MAX_IMAGE_SIZE,
		mimeTypes: IMAGE_MIME_TYPES,
	}),
	async (req, res) => {
		const region = await detectMazeRegion(req.file.buffer);
		res.json(region);
	}
);

export const config = {
	api: {
		bodyParser: false,
	},
};

export default handler;
