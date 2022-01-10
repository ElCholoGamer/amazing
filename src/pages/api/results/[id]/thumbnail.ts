import { createApiHandler } from 'modules/api/create-api-handler';
import { NotFoundError } from 'modules/api/errors/not-found';
import { StorageFolder } from 'modules/database/constants';
import { getImageUrl } from 'modules/database/image';

const handler = createApiHandler();

handler.get(async (req, res) => {
	const id = req.queryString('id');

	const imageUrl = await getImageUrl(StorageFolder.THUMBNAILS + id);
	if (!imageUrl) throw new NotFoundError('Maze not found.');

	res.redirect(imageUrl);
});

export default handler;
