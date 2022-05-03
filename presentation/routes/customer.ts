import { Router } from "express";
import createCustomer from '../controllers/UserController.js'
import customerValidators from '../validators/customer-validators.js'

const router = Router()
router.post('/', customerValidators, createCustomer) //, customerValidators, createCustomer)

export default router