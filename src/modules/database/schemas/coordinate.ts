import { Schema, Document } from 'mongoose';
import { Coordinate } from 'common/types/coordinate';

export interface ICoordinate extends Document, Coordinate {}

export const CoordinateSchema = new Schema(
	{
		x: { type: Number, required: true },
		y: { type: Number, required: true },
	},
	{
		_id: false,
		toJSON: {
			transform: (doc, ret) => [ret.x, ret.y],
		},
	}
);
