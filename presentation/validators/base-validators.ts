import { body, ValidationChain } from 'express-validator'

interface IRequestField {
    field: string,
    field_name: string
    min?: number
    max?: number
}

const validateBoolean = ({field, field_name}: IRequestField): ValidationChain =>
    body(field)
    .exists({checkNull: true})
    .withMessage(`${field_name} can't be null`)
    .isBoolean()
    .withMessage(`${field_name} must be a boolean`)
    .toBoolean()

const validateDate = ({field, field_name}: IRequestField): ValidationChain =>
    body(field)
    .trim()
    .escape()
    .trim()
    .toDate()
    .isISO8601()
    .withMessage(`${field_name} must be a Date`)

const validateString = ({field, field_name, min=undefined, max=undefined}: IRequestField): ValidationChain =>
    body(field)
    .trim()
    .escape()
    .isString()
    .withMessage(`${field_name} must be a String`)
    .isLength({min: min})
    .withMessage(`${field_name} must be of lenght ${min} at least`)
    .isLength({max: max})
    .withMessage(`${field_name} must be of lenght ${max} at maximum`)

const validateRequiredString = ({field, field_name, max=undefined, min=undefined}: IRequestField): ValidationChain =>
    validateString({field, field_name, max, min})
    .exists( {checkNull: true, checkFalsy: true})
    .withMessage(`${field_name} can't be falsy or null`)
    .notEmpty({ignore_whitespace: true})
    .withMessage(`${field_name} can't be empty`)

const validateNumber = ({field, field_name, min, max}: IRequestField) =>
    validateRequiredString({field, field_name})
    .isLength({max: max})
    .withMessage(`${field_name} must be of lenght ${max} maximum`)
     .customSanitizer((value: String) => {
        value = value.replace(/\D/g, "")
        // console.log(value)
        return value
    })
    .matches(`^\\d{${min}}$`) //TODO change to length({min: min})
    .withMessage(`${field} must be of composed of ${min} numbers`)

export {
    IRequestField,
    validateBoolean,
    validateDate,
    validateRequiredString,
    validateNumber
}