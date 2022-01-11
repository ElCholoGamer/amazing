import { Schema, Document } from 'mongoose';

export interface IRegion extends Document {
	left: number;
	top: number;
	width: number;
	height: number;
}

export const RegionSchema = new Schema(
	{
		left: { type: Number, required: true, min: 0 },
		top: { type: Number, required: true, min: 0 },
		width: { type: Number, required: true, min: 0 },
		height: { type: Number, required: true, min: 0 },
	},
	{ _id: false }
);
