import mongoose, { model } from 'mongoose';
import { IResult, ResultSchema } from '../schemas/result';

export const MODEL_NAME = 'Result';
export const Result = mongoose.models[MODEL_NAME] || model<IResult>(MODEL_NAME, ResultSchema);
