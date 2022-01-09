import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';

export const transformBody =
	(cls: ClassConstructor<any>): RequestHandler =>
	async (req, res, next) => {
		try {
			const classObj = plainToClass(cls, req.body);
			await validateOrReject(classObj, { forbidUnknownValues: true, stopAtFirstError: true });

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
