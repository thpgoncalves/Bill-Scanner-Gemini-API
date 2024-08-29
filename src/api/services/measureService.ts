import { Measurement } from '../models/measureModel';

export const saveMeasurement = async (measurementData: any) => {
  const measurement = new Measurement(measurementData);
  await measurement.save();
};

export const checkExistingMeasurement = async (
  customer_code: string,
  measure_datetime: Date,
  measure_type: string
) => {
  return Measurement.findOne({
    customer_code,
    measure_datetime: {
      $gte: new Date(measure_datetime.getFullYear(), measure_datetime.getMonth(), 1),
      $lt: new Date(measure_datetime.getFullYear(), measure_datetime.getMonth() + 1, 1),
    },
    measure_type,
  });
};

export const checkExistingMeasurementByUUID = async (measure_uuid: string) => {
  return Measurement.findOne({ measure_uuid });
};

export const listMeasurements = async (
  customer_code: string,
  measure_type?: string
) => {
  const query: any = { customer_code };

  if (measure_type) {
    query.measure_type = measure_type.toUpperCase();
  }

  return Measurement.find(query).sort({ measure_datetime: -1 });
};
