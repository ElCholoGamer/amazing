import { NotFoundError } from 'modules/api/errors/not-found';
import { createApiHandler } from 'modules/api/create-api-handler';
import { db } from 'modules/database/middleware/db';
import { getResult } from 'modules/database/result';

const handler = createApiHandler();

handler.use(db());

handler.get(async (req, res) => {
	const id = req.queryString('id');
	if (!id) throw new Error('ID query string not found');

	const result = await getResult(id);
	if (!result) throw new NotFoundError('Result not found.');

	res.json(result);
});

export default handler;
