import { Router } from 'express';
import { getMeasurementsByCustomer } from '../controllers/listController';

const router = Router();

router.get('/:customer_code/list', getMeasurementsByCustomer);

export default router;
