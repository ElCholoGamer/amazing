import NextApiFileRequest from '@common/types/next-api-file-request';
import { createApiHandler } from '@common/utils/create-api-handler';
import { fileUpload } from '@common/middleware/file-upload';
import { transformBody } from '@common/middleware/transform-body';
import { SolveOptions } from '@modules/solver/types/solve-options';
import { solveMaze } from '@modules/solver/solve';
import { validateFile } from '@modules/validator/middleware/validate-file';

const handler = createApiHandler<NextApiFileRequest>();

handler.use(fileUpload('image'));
handler.use(
	validateFile({
		maxSize: 10e6, // 10 MB
		mimeTypes: ['png', 'jpeg', 'jpg', 'webp'].map(ext => `image/${ext}`),
	})
);
handler.use(transformBody(SolveOptions));

handler.post(async (req, res) => {
	const result = await solveMaze(req.file.buffer, req.body);

	if (result === null) {
		return res.status(422).json({
			statusCode: 422,
			message: 'Unable to solve maze',
		});
	}

	res.json(result);
});

export const config = {
	api: {
		bodyParser: false,
	},
};

export default handler;
