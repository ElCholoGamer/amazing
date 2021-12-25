import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import NextApiFileRequest from '../../common/types/next-api-file-request';
import multer, { MulterError } from 'multer';
import { Request, Response } from 'express';

const handler = nextConnect();

const upload = multer().single('image');

handler.use<Request, Response>((req, res, next) => {
	upload(req, res, err => {
		if (!err) return next();

		if (err instanceof MulterError) {
			if (err.code === 'LIMIT_UNEXPECTED_FILE') {
				res.status(400).json({
					statusCode: 400,
					message: err.message,
				});
			} else {
				res.status(500).json({
					statusCode: 500,
					message: err.message,
				});
			}
		} else {
			console.error(err);
		}
	});
});

handler.post<NextApiFileRequest, NextApiResponse>((req, res) => {
	if (!req.file) {
		return res.status(400).json({
			statusCode: 400,
			message: 'File missing in request body',
		});
	}

	res.setHeader('Content-Type', 'image/png');
	res.send(req.file.buffer);
});

export const config = {
	api: {
		bodyParser: false,
	},
};

export default handler;
