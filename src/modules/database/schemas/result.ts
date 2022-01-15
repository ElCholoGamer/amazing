import { PartialResult } from 'common/types/partial-result';
import { ObjectId, Schema } from 'mongoose';
import { CoordinateSchema, ICoordinate } from './coordinate';
import { IRegion, RegionSchema } from './region';

export interface IResult extends Document {
	_id: ObjectId;
	start: ICoordinate;
	steps: ICoordinate[];
	rows: number;
	columns: number;
	imageRegion: IRegion;
	toPartial(): PartialResult;
	toJSON(): any;
	createdAt: Date;
}

export const ResultSchema = new Schema(
	{
		imageRegion: { type: RegionSchema, required: true },
		rows: { type: Number, required: true, min: 1 },
		columns: { type: Number, required: true, min: 1 },
		start: { type: CoordinateSchema, required: true },
		steps: { type: [CoordinateSchema], required: true },
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
