import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject, ValidationError, ValidatorOptions } from 'class-validator';
import { HttpError } from 'common/errors/http';
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
		} catch (err: any) {
			if (!Array.isArray(err)) throw err;

			const messages = err.map((error: ValidationError) => Object.values(error.constraints || {}));

			next(
				new HttpError(400, 'Validation error', {
					statusCode: 400,
					errors: messages.flat(),
				})
			);
		}
	};
};
