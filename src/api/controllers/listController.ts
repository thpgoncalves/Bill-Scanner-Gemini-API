import { Request, Response } from 'express';
import { listMeasurements } from '../services/measureService';

export const getMeasurementsByCustomer = async (req: Request, res: Response) => {
  try {
    const { customer_code } = req.params;
    const { measure_type } = req.query;

    if (measure_type && typeof measure_type === 'string') {
      const validMeasureTypes = ['WATER', 'GAS'];
      if (!validMeasureTypes.includes(measure_type.toUpperCase())) {
        return res.status(400).json({
          error_code: 'INVALID_TYPE',
          error_description: 'Tipo de medição não permitida',
        });
      }
    }

    const measurements = await listMeasurements(customer_code, measure_type?.toString());

    if (measurements.length === 0) {
      return res.status(404).json({
        error_code: 'MEASURES_NOT_FOUND',
        error_description: 'Nenhuma leitura encontrada',
      });
    }

    return res.status(200).json({
      customer_code,
      measures: measurements.map((measurement) => ({
        measure_uuid: measurement.measure_uuid,
        measure_datetime: measurement.measure_datetime,
        measure_type: measurement.measure_type,
        has_confirmed: measurement.confirmed,
        image_url: measurement.image_link,
      })),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to retrieve measurements.' });
  }
};
