import { createApiHandler } from 'modules/api/create-api-handler';
import { NotFoundError } from 'modules/api/errors/not-found';

const handler = createApiHandler();

handler.all(() => {
	throw new NotFoundError();
});

export default handler;
