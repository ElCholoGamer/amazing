import mongoose, { ConnectOptions } from 'mongoose';

export async function connectDatabase(options?: ConnectOptions) {
	const { MONGODB_URI } = process.env;
	if (!MONGODB_URI) throw new Error('Missing MONGODB_URI enviroment variable');

	return mongoose.connect(MONGODB_URI, options);
}
