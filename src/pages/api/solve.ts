import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import NextApiFileRequest from '../../common/types/next-api-file-request';
import { fileUpload } from '../../common/middleware/file-upload';
import { transformBody } from '../../common/middleware/transform-body';
import { SolveOptions } from '../../modules/solver/types/solve-options';
import { solveMaze } from '../../modules/solver/solve';
import { validateFile } from '../../modules/validator/middleware/validate-file';

const handler = nextConnect();

handler.use(fileUpload('image'));
handler.use(
	validateFile({
		maxSize: 10e6,
		mimeTypes: ['png', 'jpeg', 'jpg', 'webp'].map(ext => `image/${ext}`),
	})
);
handler.use(transformBody(SolveOptions));

handler.post<NextApiFileRequest, NextApiResponse>(async (req, res) => {
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
