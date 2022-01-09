import { Transform } from 'class-transformer';

export function ParseNumber() {
	return Transform(({ value }) => Number(value));
}
