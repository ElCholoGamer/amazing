import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import NextApiFileRequest from '../../common/types/next-api-file-request';
import multer from 'multer';
import { uploadHandler } from '../../common/middleware/upload-handler';
import { bufferToImageData } from '../../common/utils/buffer-to-image-data';
import { parseCells } from '../../modules/parser/parse-cells';
import { Region } from 'sharp';
import { solveMaze } from '../../modules/solver/solver';
import { validateImage } from '../../common/middleware/validate-image';

const handler = nextConnect();

const upload = multer().single('image');
handler.use(uploadHandler(upload));
handler.use(validateImage({ maxSize: 10e6 }));

handler.post<NextApiFileRequest, NextApiResponse>(async (req, res) => {
	const { left, top, width, height, rows, columns, start, end } = req.body;

	const region: Region = {
		left: Number(left),
		top: Number(top),
		width: Number(width),
		height: Number(height),
	};

	const imageData = await bufferToImageData(req.file.buffer, region);
	const cells = parseCells(imageData, Number(rows), Number(columns));

	const [startX, startY] = start.split(',').map(Number);
	const [endX, endY] = end.split(',').map(Number);

	const result = solveMaze(cells, { x: startX, y: startY }, { x: endX, y: endY });

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
