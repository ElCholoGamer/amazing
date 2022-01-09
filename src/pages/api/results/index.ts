import { RESULT_PAGE_SIZE } from 'common/constants';
import { createApiHandler } from 'common/utils/create-api-handler';
import { db } from 'modules/database/db';
import { Result } from 'modules/database/models/result';

const handler = createApiHandler();

handler.use(db());

handler.get(async (req, res) => {
	const skipPages = Math.max(Number(req.query.page) - 1, 0) || 0;
	const results = await Result.find(
		{},
		{},
		{
			skip: skipPages * RESULT_PAGE_SIZE,
			limit: RESULT_PAGE_SIZE,
		}
	);

	res.json(results);
});

export default handler;
