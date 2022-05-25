import { Router } from 'express';
import userValidationMiddleware from '@middleware/User/userValidationMiddleware';
import UserController from '../controllers/UserController';

const router = Router();
router.post('/', userValidationMiddleware, UserController.createCustomer);
router.get('/', UserController.getCustomers);

export default router;
