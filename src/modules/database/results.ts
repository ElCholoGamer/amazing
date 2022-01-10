import { QueryOptions } from 'mongoose';
import { Result } from './models/result';

export const getAllResults = (options?: QueryOptions) => Result.find({}, {}, options);

export const getLatestResults = (limit = 10) => Result.find({}, {}, { limit });
