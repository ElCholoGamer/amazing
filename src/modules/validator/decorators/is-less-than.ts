import {
	ValidationOptions,
	registerDecorator,
	ValidationArguments,
	buildMessage,
} from 'class-validator';
import { Coordinate } from '../../../common/types/coordinate';

export function IsLessThan(property: string, validationOptions: ValidationOptions = {}) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isLessThan',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [property],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					const [propertyName] = args.constraints;
					const toCompare = (args.object as any)[propertyName];

					return typeof value === 'number' && typeof toCompare === 'number' && value < toCompare;
				},
				defaultMessage: buildMessage(
					eachPrefix => eachPrefix + '$property must be less than $constraint1',
					validationOptions
				),
			},
		});
	};
}

export function IsXLessThan(property: string, validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'IsXLessThan',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [property],
			options: validationOptions,
			validator: {
				validate(value: Coordinate, args: ValidationArguments) {
					const [propertyName] = args.constraints;
					const toCompare = (args.object as any)[propertyName];

					return typeof toCompare === 'number' && value.x < toCompare;
				},
				defaultMessage: buildMessage(
					eachPrefix => eachPrefix + 'X value of $property must be less than $constraint1',
					validationOptions
				),
			},
		});
	};
}

export function IsYLessThan(property: string, validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'IsYLessThan',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [property],
			options: validationOptions,
			validator: {
				validate(value: Coordinate, args: ValidationArguments) {
					const [propertyName] = args.constraints;
					const toCompare = (args.object as any)[propertyName];

					return typeof toCompare === 'number' && value.y < toCompare;
				},
				defaultMessage: buildMessage(
					eachPrefix => eachPrefix + 'Y value of $property must be less than $constraint1',
					validationOptions
				),
			},
		});
	};
}
