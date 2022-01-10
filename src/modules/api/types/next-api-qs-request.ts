import { NextApiRequest } from 'next';

export interface NextApiQsRequest extends NextApiRequest {
	queryString(field: string): string | undefined;
}
