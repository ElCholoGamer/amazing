import { Query, QueryOptions } from 'mongoose';
import { Result } from './models/result';
import { IResult } from './schemas/result';

export const getAllResults = (options?: QueryOptions): Query<IResult[], IResult> =>
	Result.find({}, {}, options);

export const getLatestResults = (limit = 10): Query<IResult[], IResult> =>
	Result.find({}, {}, { limit });
