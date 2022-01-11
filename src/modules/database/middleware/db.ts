import { RequestHandler } from 'express';
import { ConnectOptions } from 'mongoose';
import { connectDatabase } from '../connect';

export const db =
	(options?: ConnectOptions): RequestHandler =>
	async (req, res, next) => {
		await connectDatabase(options);
		next();
	};
