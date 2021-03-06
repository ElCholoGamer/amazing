import { IsInt, Min } from 'class-validator';
import { ParseNumber } from 'common/decorators/parse-number';
import { Coordinate } from 'common/types/coordinate';
import { ParseCoordinate } from 'common/decorators/parse-coordinate';
import { IsIntCoordinate } from 'modules/validator/decorators/is-int-coordinate';
import { MinCoordinate } from 'modules/validator/decorators/min-coordinates';
import { IsEqualOrLessThan } from 'modules/validator/decorators/is-equal-or-less-than';
import { IsXLessThan, IsYLessThan } from 'modules/validator/decorators/is-less-than';
import { RegionDto } from 'common/types/region-dto';

export class SolveOptions extends RegionDto {
	@ParseNumber()
	@IsEqualOrLessThan('height')
	@Min(1)
	@IsInt()
	rows!: number;

	@ParseNumber()
	@IsEqualOrLessThan('width')
	@Min(1)
	@IsInt()
	columns!: number;

	@ParseCoordinate()
	@IsXLessThan('columns')
	@IsYLessThan('rows')
	@MinCoordinate({ x: 0, y: 0 })
	@IsIntCoordinate()
	start!: Coordinate;

	@ParseCoordinate()
	@IsXLessThan('columns')
	@IsYLessThan('rows')
	@MinCoordinate({ x: 0, y: 0 })
	@IsIntCoordinate()
	end!: Coordinate;
}
