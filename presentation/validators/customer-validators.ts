import got from 'got'
//import isCpfValid from "../../utils/validateData"
import { validateBoolean, validateDate, validateRequiredString, validateNumber, IRequestField } from './base-validators'

const validateName = () =>
    validateRequiredString({field: "full_name", field_name: "Full Name"})
    .isLength({min: 1})
    .withMessage("Full Name must have at least one character")
    .isAlpha()
    .withMessage("Full Name must only be composed of letters")

const validateEmail = (
    {field, field_name}: IRequestField = {field:"email", field_name:"Email"}) =>
    validateRequiredString({field, field_name})
    .isEmail()
    .withMessage(`${field_name} must be a valid email`)
    .normalizeEmail()

const validateEmailConfirm = () =>
    validateEmail({field: "email_confirmation", field_name: "Email Confirmation"})
    .custom( async (value: string, { req }) => {
        return value !== req.body.email ? Promise.reject() : undefined
    })


const customerValidators = [
    validateName(), validateEmail(), validateEmailConfirm()
]
export default customerValidators