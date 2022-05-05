import { Router } from "express";
import UserController from '../controllers/UserController'
import customerValidators from '../validators/customer-validators'

const router = Router()
router.post('/', customerValidators, UserController.createCustomer)
router.get('/', UserController.listCustomers)

export default router