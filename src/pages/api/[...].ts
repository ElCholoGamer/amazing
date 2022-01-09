import { createApiHandler } from 'modules/api/create-api-handler';
import { NotFoundError } from 'modules/api/errors/not-found';

const handler = createApiHandler();

handler.all(() => {
	throw new NotFoundError('Not found.');
});

export default handler;
