import mongoose, { Schema, Document } from 'mongoose';

export interface IMeasurement extends Document {
  measure_uuid: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: string;
  value: number;
  image_link: string;
}

const MeasurementSchema: Schema = new Schema({
  measure_uuid: { type: String, required: true, unique: true },
  customer_code: { type: String, required: true },
  measure_datetime: { type: Date, required: true },
  measure_type: { type: String, required: true, enum: ['WATER', 'GAS'] },
  value: { type: Number, required: true },
  image_link: { type: String, required: true },
});

export const Measurement = mongoose.model<IMeasurement>('Measurement', MeasurementSchema);
