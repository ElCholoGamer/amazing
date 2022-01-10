import { createApiHandler } from 'modules/api/create-api-handler';
import { db } from 'modules/database/middleware/db';
import { getLatestResults } from 'modules/database/result';

const handler = createApiHandler();

handler.use(db());

handler.get(async (req, res) => {
	const results = await getLatestResults();
	res.json(results.map(result => result.toPartial()));
});

export default handler;
