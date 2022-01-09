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
						typeof value.x === 'number' &&
						typeof value.y === 'number' &&
						!isNaN(value.x) &&
						!isNaN(value.y)
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
