import got from 'got'
import isCpfValid from "../../util/validateData.js"
import { validateBoolean, validateDate, validateRequiredString, validateNumber, IRequestField } from './base-validators.js'

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
     validateRequiredString({field: "country", field_name: "Country", max: 128})

const validateCity = () =>
     validateRequiredString({field: "city", field_name: "City", max: 128})

const validatePostalCode = () =>
     validateNumber({field: "postal_code", field_name: "PostalCode", min: 8, max: 9})
     .custom(async (value: string) => {
        const apiResponse: any = 
            JSON.parse(await (
                await got(`https://cep.awesomeapi.com.br/json/${value}`,
                {throwHttpErrors: false})
            ).body)
        if (typeof apiResponse.status !== 'undefined') return Promise.reject()
     })

const customerValidators = [
    validateName(), validateEmail(), validateEmailConfirm(), validateCpf(), 
    validateCellphone(), validateBirthdate(), validateEmailSms(), validateWhatsapp(),
    validateCountry(), validateCity(), validatePostalCode()
]
export default customerValidators