import { fileUpload } from 'common/middleware/file-upload';
import { validateFile } from 'modules/validator/middleware/validate-file';
import { createApiHandler } from 'modules/api/create-api-handler';
import { IMAGE_MIME_TYPES, MAX_IMAGE_SIZE } from 'modules/api/constants';
import { detectCellCount } from 'modules/parser/detect-cell-count';
import { NextApiFileRequest } from 'modules/api/types/next-api-file-request';
import { transformBody } from 'common/middleware/transform-body';
import { RegionDto } from 'common/types/region-dto';

const handler = createApiHandler<NextApiFileRequest>();

handler.post(
	fileUpload('image'),
	validateFile({
		maxSize: MAX_IMAGE_SIZE,
		mimeTypes: IMAGE_MIME_TYPES,
	}),
	transformBody(RegionDto),
	async (req, res) => {
		const region = req.body as RegionDto;
		const cellCount = await detectCellCount(req.file.buffer, region);

		res.json(cellCount);
	}
);

export const config = {
	api: {
		bodyParser: false,
	},
};

export default handler;
