import { createApiHandler } from 'modules/api/create-api-handler';

const handler = createApiHandler();

handler.get((req, res) => res.json({ hello: 'world' }));

export default handler;
