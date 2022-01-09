import { RESULT_PAGE_SIZE } from 'common/constants';
import { UnprocessableEntityError } from 'common/errors/http/unprocessable-entity';
import { fileUpload } from 'common/middleware/file-upload';
import { transformBody } from 'common/middleware/transform-body';
import NextApiFileRequest from 'common/types/next-api-file-request';
import { createApiHandler } from 'common/utils/create-api-handler';
import { createResult } from 'modules/database/create-result';
import { db } from 'modules/database/db';
import { Result } from 'modules/database/models/result';
import { solveMaze } from 'modules/solver/solve';
import { SolveOptions } from 'modules/solver/types/solve-options';
import { validateFile } from 'modules/validator/middleware/validate-file';

const handler = createApiHandler<NextApiFileRequest>();

handler.use(db());

handler.get(async (req, res) => {
	const skipPages = Math.max(Number(req.query.page) - 1, 0) || 0;
	const results = await Result.find(
		{},
		{},
		{
			skip: skipPages * RESULT_PAGE_SIZE,
			limit: RESULT_PAGE_SIZE,
		}
	);

	res.json(results);
});

handler.post(
	fileUpload('image'),
	validateFile({
		maxSize: 10e6, // 10 MB
		mimeTypes: ['png', 'jpeg', 'jpg', 'webp'].map(ext => `image/${ext}`),
	}),
	transformBody(SolveOptions),
	async (req, res) => {
		const steps = await solveMaze(req.file.buffer, req.body);

		if (steps === null) {
			throw new UnprocessableEntityError('Unable to solve maze');
		}

		const result = await createResult(steps);
		res.json(result);
	}
);

export const config = {
	api: {
		bodyParser: false,
	},
};

export default handler;
