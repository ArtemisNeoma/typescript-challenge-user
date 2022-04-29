import { Router } from "express";
import createCustomer from '../controllers/UserController'
// import customerValidators from '../validators/customer-validators'

const router = Router()
router.post('/', createCustomer) //, customerValidators, createCustomer)

export default router