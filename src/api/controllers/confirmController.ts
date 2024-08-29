import { Request, Response } from 'express';
import { checkExistingMeasurementByUUID, saveMeasurement } from '../services/measureService';

export const confirmMeasurement = async (req: Request, res: Response) => {
  try {
    const { measure_uuid, confirmed_value } = req.body;

    if (typeof measure_uuid !== 'string' || typeof confirmed_value !== 'number') {
      return res.status(400).json({ 
        error_code: "INVALID_DATA", 
        error_description: "Invalid data types provided." 
      });
    }

    const existingMeasurement = await checkExistingMeasurementByUUID(measure_uuid);
    if (!existingMeasurement) {
      return res.status(404).json({ 
        error_code: "MEASURE_NOT_FOUND", 
        error_description: "Measurement not found." 
      });
    }

    if (existingMeasurement.confirmed) {
      return res.status(409).json({ 
        error_code: "CONFIRMATION_DUPLICATE", 
        error_description: "Measurement is already confirmed." 
      });
    }

    existingMeasurement.value = confirmed_value;
    existingMeasurement.confirmed = true;
    await saveMeasurement(existingMeasurement);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      error_code: "INTERNAL_ERROR", 
      error_description: "Failed to confirm the measurement." 
    });
  }
};
