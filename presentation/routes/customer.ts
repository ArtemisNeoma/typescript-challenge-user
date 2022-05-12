import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();
router.post('/', UserController.createCustomer);
router.get('/', UserController.getCustomers);

export default router;
