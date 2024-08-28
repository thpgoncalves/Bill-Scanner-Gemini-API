import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { saveMeasurement, checkExistingMeasurement } from '../services/measureService';
import { validateUploadData } from '../middlewares/validationMiddleware';
import { extractValueFromImage } from '../services/llmService';

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { image, customer_code, measure_datetime, measure_type } = req.body;

    const validationError = validateUploadData(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const existingMeasurement = await checkExistingMeasurement(customer_code, measure_datetime, measure_type);
    if (existingMeasurement) {
      return res.status(400).json({ error: 'Measurement already exists for this month and type.' });
    }

    const extracted_value = await extractValueFromImage(image);

    const measure_uuid = uuidv4();
    const image_link = `https://yourstorage.com/images/${measure_uuid}`;

    await saveMeasurement({
      measure_uuid,
      customer_code,
      measure_datetime,
      measure_type,
      value: extracted_value,
      image_link,
      confirmed: false, 
    });

    return res.status(200).json({
      measure_uuid,
      image_link,
      extracted_value,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to process the image.' });
  }
};
