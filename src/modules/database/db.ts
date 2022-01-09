import { RequestHandler } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';

export const db =
	(options: ConnectOptions = {}): RequestHandler =>
	async (req, res, next) => {
		const { MONGODB_URI } = process.env;
		if (!MONGODB_URI) throw new Error('Missing MONGODB_URI enviroment variable');

		await mongoose.connect(MONGODB_URI, options);
		next();
	};
