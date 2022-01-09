import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject, ValidationError, ValidatorOptions } from 'class-validator';
import { RequestHandler } from 'express';

export const transformBody = (
	cls: ClassConstructor<any>,
	validatorOptions: ValidatorOptions = {}
): RequestHandler => {
	validatorOptions.forbidUnknownValues ??= true;
	validatorOptions.stopAtFirstError ??= true;

	return async (req, res, next) => {
		try {
			const classObj = plainToClass(cls, req.body);
			await validateOrReject(classObj, validatorOptions);

			req.body = classObj;
			next();
		} catch (errors: any) {
			const messages = errors.map((error: ValidationError) =>
				Object.values(error.constraints || {})
			);

			res.status(400).json({
				statusCode: 400,
				errors: messages.flat(),
			});
		}
	};
};
