import { Router } from "express";
import createCustomer from '../controllers/UserController'
import customerValidators from '../validators/customer-validators'

const router = Router()
router.post('/', customerValidators, createCustomer)
router.get('/user')

export default router