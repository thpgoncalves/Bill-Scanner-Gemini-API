import { Request, Response } from 'express';
import { checkExistingMeasurementByUUID, saveMeasurement } from '../services/measureService';

export const confirmMeasurement = async (req: Request, res: Response) => {
  try {
    const { measure_uuid, confirmed_value } = req.body;

    const existingMeasurement = await checkExistingMeasurementByUUID(measure_uuid);
    if (!existingMeasurement) {
      return res.status(404).json({ error: 'Measurement not found.' });
    }

    if (existingMeasurement.confirmed) {
      return res.status(400).json({ error: 'Measurement is already confirmed.' });
    }

    existingMeasurement.value = confirmed_value;
    existingMeasurement.confirmed = true;
    await saveMeasurement(existingMeasurement);

    return res.status(200).json({ message: 'Measurement confirmed successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to confirm the measurement.' });
  }
};
