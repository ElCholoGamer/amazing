import {
	buildMessage,
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
} from 'class-validator';
import { Coordinate } from '@common/types/coordinate';

export function MinCoordinate(minValue: Coordinate, validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'minCoordinate',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [minValue.x, minValue.y],
			options: validationOptions,
			validator: {
				validate(value: Coordinate, args: ValidationArguments) {
					const [minX, minY] = args.constraints;
					return value.x >= minX && value.y >= minY;
				},
				defaultMessage: buildMessage(
					eachPrefix =>
						eachPrefix +
						'$property coordinates must be equal or greater than ($constraint1;$constraint2)',
					validationOptions
				),
			},
		});
	};
}
