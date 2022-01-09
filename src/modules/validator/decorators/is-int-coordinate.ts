import { buildMessage, registerDecorator, ValidationOptions } from 'class-validator';

export function IsIntCoordinate(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isIntCoordinate',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: any) {
					return (
						typeof value === 'object' &&
						typeof value.x === 'number' &&
						typeof value.y === 'number' &&
						Number.isInteger(value.x) &&
						Number.isInteger(value.y)
					);
				},
				defaultMessage: buildMessage(
					eachPrefix => eachPrefix + '$property coordinates must be integers',
					validationOptions
				),
			},
		});
	};
}
