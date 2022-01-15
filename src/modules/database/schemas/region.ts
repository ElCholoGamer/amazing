import { Schema, Document } from 'mongoose';
import { Region } from 'sharp';

export interface IRegion extends Region, Document {}

export const RegionSchema = new Schema(
	{
		left: { type: Number, required: true, min: 0 },
		top: { type: Number, required: true, min: 0 },
		width: { type: Number, required: true, min: 0 },
		height: { type: Number, required: true, min: 0 },
	},
	{ _id: false }
);
