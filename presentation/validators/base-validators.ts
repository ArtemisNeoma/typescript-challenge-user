import { body, ValidationChain } from 'express-validator';

interface IRequestField {
  field: string,
  fieldName: string
  min?: number
  max?: number
}

const validateBase = ({ field }: IRequestField): ValidationChain => body(field)
  .trim()
  .escape();

const validateBoolean = ({
  field, fieldName,
}: IRequestField): ValidationChain => validateBase({
  field, fieldName,
})
  .exists({ checkNull: true })
  .withMessage(`${fieldName} can't be null`)
  .isBoolean()
  .withMessage(`${fieldName} must be a boolean`)
  .toBoolean();

const validateDate = ({
  field, fieldName,
}: IRequestField): ValidationChain => validateBase({
  field, fieldName,
})
  .toDate()
  .isISO8601()
  .withMessage(`${fieldName} must be a Date`);

const validateString = ({
  field, fieldName, min = undefined, max = undefined,
}: IRequestField): ValidationChain => validateBase({
  field, fieldName,
})
  .isString()
  .withMessage(`${fieldName} must be a String`)
  .isLength({ min })
  .withMessage(`${fieldName} must be of lenght ${min} at least`)
  .isLength({ max })
  .withMessage(`${fieldName} must be of lenght ${max} at maximum`);

const validateRequiredString = ({
  field, fieldName, max = undefined, min = undefined,
}: IRequestField): ValidationChain => validateString({
  field, fieldName, max, min,
})
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage(`${fieldName} can't be falsy or null`)
  .notEmpty({ ignore_whitespace: true })
  .withMessage(`${fieldName} can't be empty`);

const validateNumber = ({
  field, fieldName, min, max,
}: IRequestField) => validateRequiredString({ field, fieldName })
  .isLength({ max })
  .withMessage(`${fieldName} must be of lenght ${max} maximum`)
  .customSanitizer((value: String) => {
    const newValue = value.replace(/\D/g, '');
    // console.log(value)
    return newValue;
  })
  .matches(`^\\d{${min}}$`) // TODO change to length({min: min})
  .withMessage(`${field} must be of composed of ${min} numbers`);

export {
  IRequestField,
  validateBoolean,
  validateDate,
  validateRequiredString,
  validateNumber,
};
