import { NextApiResponse } from 'next';
import { Middleware } from 'next-connect';
import { NextApiQsRequest } from '../types/next-api-qs-request';

export interface Options {
	transformArray?: (value: string[]) => string;
}

export const queryString =
	(options: Options = {}): Middleware<NextApiQsRequest, NextApiResponse> =>
	(req, res, next) => {
		const { transformArray = v => v.join(',') } = options;

		req.queryString = field => {
			const value = req.query[field];
			return Array.isArray(value) ? transformArray(value) : value;
		};

		next();
	};
