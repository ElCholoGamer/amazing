import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import NextApiFileRequest from '../../common/types/next-api-file-request';
import { uploadHandler } from '../../common/middleware/upload-handler';
import { validateImage } from '../../modules/validator/validate-image';
import { transformBody } from '../../common/middleware/transform-body';
import { SolveOptions } from '../../modules/solver/types/solve-options';
import { solveMaze } from '../../modules/solver/solve';

const handler = nextConnect();

const upload = multer().single('image');
handler.use(uploadHandler(upload));
handler.use(validateImage({ maxSize: 10e6 }));
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
