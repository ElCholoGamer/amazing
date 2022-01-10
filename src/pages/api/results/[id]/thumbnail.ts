import { createApiHandler } from 'modules/api/create-api-handler';
import { cloudinaryRedirect } from 'modules/api/utils/cloudinary-redirect';
import { StorageFolder } from 'modules/database/constants';

const handler = createApiHandler();

handler.get(async (req, res) => {
	const id = req.queryString('id');
	await cloudinaryRedirect(res, StorageFolder.MAZES + id);
});

export default handler;
