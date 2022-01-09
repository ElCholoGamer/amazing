import { ObjectId, Schema } from 'mongoose';
import { CoordinateSchema, ICoordinate } from './coordinate';

export interface IResult extends Document {
	_id: ObjectId;
	steps: ICoordinate[];
	toPartial(): any;
	toJSON(): any;
	createdAt: Date;
}

export const ResultSchema = new Schema(
	{
		steps: { type: [CoordinateSchema] },
	},
	{
		timestamps: { updatedAt: false },
		toJSON: {
			virtuals: true,
			versionKey: false,
			transform: (doc, ret) => {
				delete ret._id;
				ret.createdAt = ret.createdAt.getTime();
				return ret;
			},
		},
	}
);

ResultSchema.method('toPartial', function (this: IResult) {
	const json = this.toJSON();
	delete json.steps;
	return json;
});
