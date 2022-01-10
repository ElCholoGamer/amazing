import { NotFoundError } from 'modules/api/errors/not-found';
import { createApiHandler } from 'modules/api/create-api-handler';
import { Result } from 'modules/database/models/result';
import { db } from 'modules/database/middleware/db';
import { validateObjectId } from 'modules/validator/middleware/validate-object-id';

const handler = createApiHandler();

handler.use(
	validateObjectId(req => req.query.id, {
		onFail: () => {
			throw new NotFoundError('Result not found.');
		},
	})
);
handler.use(db());

handler.get(async (req, res) => {
	const id = req.queryString('id');

	const result = await Result.findById(id);
	if (!result) throw new NotFoundError('Result not found.');

	res.json(result);
});

export default handler;
