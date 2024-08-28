import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { saveMeasurement, checkExistingMeasurement } from '../services/measureService';
import { validateUploadData } from '../middlewares/validationMiddleware';
import { extractValueFromImage } from '../services/llmService';
import { uploadImage } from '../services/fileUploadService';

export const uploadImageAndGenerateContent = async (req: Request, res: Response) => {
  try {
    const { image, customer_code, measure_datetime, measure_type } = req.body;

    const validationError = validateUploadData(req.body);
    if (validationError) {
      return res.status(400).json({ 
        error_code: "INVALID_DATA", 
        error_description: validationError 
      });
    }

    const measureDate = new Date(measure_datetime);
    if (isNaN(measureDate.getTime())) {
      return res.status(400).json({ 
        error_code: "INVALID_DATA", 
        error_description: 'Invalid date format.' 
      });
    }

    const existingMeasurement = await checkExistingMeasurement(customer_code, measureDate, measure_type);
    if (existingMeasurement) {
      return res.status(409).json({ 
        error_code: "DOUBLE_REPORT", 
        error_description: 'Leitura do mês já realizada.' 
      });
    }

    const uploadedImageUri = await uploadImage(image);

    const extracted_value = await extractValueFromImage(uploadedImageUri);

    const measure_uuid = uuidv4();
    const image_link = uploadedImageUri;

    await saveMeasurement({
      measure_uuid,
      customer_code,
      measure_datetime: measureDate, 
      measure_type,
      value: extracted_value,
      image_link,
      confirmed: false,
    });

    return res.status(200).json({
      image_url: image_link,
      measure_value: extracted_value,
      measure_uuid,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      error_code: "INTERNAL_ERROR", 
      error_description: 'Failed to process the image.' 
    });
  }
};