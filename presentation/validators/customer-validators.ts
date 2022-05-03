import got from 'got'
import isCpfValid from "../../util/validateData"
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
    }).withMessage("Email Confirmation must be the same as Email")

const validateCpf = () =>
    validateNumber({field: 'cpf', field_name: "CPF", min: 11, max: 14})
    .custom(async (value: string) => {
        //console.log("Going into isCpfValid")
         if (!isCpfValid(value)) return Promise.reject()
     }).withMessage("CPF is not a valid CPF")

const validateCellphone = () =>
     validateNumber({field: "cellphone", field_name: "Cellphone Number", min: 11, max: 15})

const validateBirthdate = () =>
     validateDate({field: "birthdate", field_name: "Birthdate"})

const validateEmailSms = () =>
     validateBoolean({field: "email_sms", field_name: "EmailSms"})

const validateWhatsapp = () =>
     validateBoolean({field: "whatsapp", field_name: "Whatsapp"})

const validateCountry = () =>
     validateRequiredString({field: "country", field_name: "Country", min: 0, max: 256})

const customerValidators = [
    validateName(), validateEmail(), validateEmailConfirm(), validateCpf(), 
    validateCellphone(), validateBirthdate(), validateEmailSms(), validateWhatsapp(),
    validateCountry()
]
export default customerValidators