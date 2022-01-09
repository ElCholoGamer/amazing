import {
	ValidationOptions,
	registerDecorator,
	ValidationArguments,
	buildMessage,
} from 'class-validator';
import { Coordinate } from '../../../common/types/coordinate';

export function IsEqualOrLessThan(property: string, validationOptions: ValidationOptions = {}) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isEqualOrLessThan',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [property],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					const [propertyName] = args.constraints;
					const toCompare = (args.object as any)[propertyName];

					return typeof value === 'number' && typeof toCompare === 'number' && value <= toCompare;
				},
				defaultMessage: buildMessage(
					eachPrefix => eachPrefix + '$property must be equal or less than $constraint1',
					validationOptions
				),
			},
		});
	};
}

export function IsXEqualOrLessThan(property: string, validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'IsXEqualOrLessThan',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [property],
			options: validationOptions,
			validator: {
				validate(value: Coordinate, args: ValidationArguments) {
					const [propertyName] = args.constraints;
					const toCompare = (args.object as any)[propertyName];

					return typeof toCompare === 'number' && value.x <= toCompare;
				},
				defaultMessage: buildMessage(
					eachPrefix => eachPrefix + 'X value of $property must be equal or less than $constraint1',
					validationOptions
				),
			},
		});
	};
}

export function IsYEqualOrLessThan(property: string, validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'IsYEqualOrLessThan',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [property],
			options: validationOptions,
			validator: {
				validate(value: Coordinate, args: ValidationArguments) {
					const [propertyName] = args.constraints;
					const toCompare = (args.object as any)[propertyName];

					return typeof toCompare === 'number' && value.y <= toCompare;
				},
				defaultMessage: buildMessage(
					eachPrefix => eachPrefix + 'Y value of $property must be equal or less than $constraint1',
					validationOptions
				),
			},
		});
	};
}
