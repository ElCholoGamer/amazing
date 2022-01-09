import { NotFoundError } from 'modules/api/errors/not-found';
import { createApiHandler } from 'modules/api/create-api-handler';
import { Result } from 'modules/database/models/result';
import { db } from 'modules/database/db';
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
	const { query } = req;
	const id = Array.isArray(query.id) ? query.id.join(',') : query.id;

	const result = await Result.findById(id);
	if (!result) throw new NotFoundError('Result not found.');

	res.json(result);
});

export default handler;
