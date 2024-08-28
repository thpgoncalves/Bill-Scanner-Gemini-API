import { Router } from 'express';
import { uploadImageAndGenerateContent } from '../controllers/uploadController';

const router = Router();

router.post('/upload', uploadImageAndGenerateContent);

export default router;
