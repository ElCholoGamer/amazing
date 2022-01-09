import { Transform } from 'class-transformer';
import { Coordinate } from 'common/types/coordinate';

export function ParseCoordinate() {
	return Transform(({ value }): Coordinate => {
		if (typeof value !== 'string') return { x: NaN, y: NaN };

		const [x, y] = value.split(',');
		return { x: Number(x), y: Number(y) };
	});
}
