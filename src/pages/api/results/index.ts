import { NextApiFileRequest } from 'modules/api/types/next-api-file-request';
import { UnprocessableEntityError } from 'modules/api/errors/unprocessable-entity';
import { fileUpload } from 'common/middleware/file-upload';
import { transformBody } from 'common/middleware/transform-body';
import { createApiHandler } from 'modules/api/create-api-handler';
import { createResult } from 'modules/database/result';
import { db } from 'modules/database/middleware/db';
import { solveMaze } from 'modules/solver/solve';
import { SolveOptions } from 'modules/solver/types/solve-options';
import { validateFile } from 'modules/validator/middleware/validate-file';
import { Result } from 'modules/database/models/result';
import { IMAGE_MIME_TYPES, MAX_IMAGE_SIZE } from 'modules/api/constants';

const handler = createApiHandler<NextApiFileRequest>();

handler.use(db());

handler.get(async (req, res) => {
	const results = await Result.find();
	res.json(results.map(result => result.toPartial()));
});

handler.post(
	fileUpload('image'),
	validateFile({
		maxSize: MAX_IMAGE_SIZE,
		mimeTypes: IMAGE_MIME_TYPES,
	}),
	transformBody(SolveOptions),
	async (req, res) => {
		const image = req.file.buffer;
		const options = req.body as SolveOptions;

		const steps = await solveMaze(image, options);

		if (steps === null) {
			throw new UnprocessableEntityError('Unable to solve maze');
		}

		const result = await createResult(steps, image, options);
		res.json(result);
	}
);

export const config = {
	api: {
		bodyParser: false,
	},
};

export default handler;
