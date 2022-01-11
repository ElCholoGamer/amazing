import { Min, IsInt } from 'class-validator';
import { ParseNumber } from 'common/decorators/parse-number';

export class RegionDto {
	@ParseNumber()
	@Min(0)
	@IsInt()
	left!: number;

	@ParseNumber()
	@Min(0)
	@IsInt()
	top!: number;

	@ParseNumber()
	@Min(1)
	@IsInt()
	width!: number;

	@ParseNumber()
	@Min(1)
	@IsInt()
	height!: number;
}
