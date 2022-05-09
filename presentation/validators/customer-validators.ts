import got from 'got';
import isCpfValid from '../../util/validateData';
import {
  validateBoolean, validateDate, validateRequiredString, validateNumber, IRequestField,
} from './base-validators';

const validateName = () => validateRequiredString({ field: 'full_name', fieldName: 'Full Name' })
  .isLength({ min: 1 })
  .withMessage('Full Name must have at least one character')
  .isAlpha()
  .withMessage('Full Name must only be composed of letters');

const validateEmail = (
  { field, fieldName }: IRequestField = { field: 'email', fieldName: 'Email' },
) => validateRequiredString({ field, fieldName })
  .isEmail()
  .withMessage(`${fieldName} must be a valid email`)
  .normalizeEmail();

const validateEmailConfirm = () => validateEmail({ field: 'email_confirmation', fieldName: 'Email Confirmation' })
  .custom(async (value: string, { req }) => (value !== req.body.email ? Promise.reject() : undefined)).withMessage('Email Confirmation must be the same as Email');

const validateCpf = () => validateNumber({
  field: 'cpf', fieldName: 'CPF', min: 11, max: 14,
})
  .custom(async (value: string) => {
    // console.log("Going into isCpfValid")
    if (!isCpfValid(value)) return Promise.reject();
  }).withMessage('CPF is not a valid CPF');

const validateCellphone = () => validateNumber({
  field: 'cellphone', fieldName: 'Cellphone Number', min: 11, max: 15,
});

const validateBirthdate = () => validateDate({ field: 'birthdate', fieldName: 'Birthdate' });

const validateEmailSms = () => validateBoolean({ field: 'email_sms', fieldName: 'EmailSms' });

const validateWhatsapp = () => validateBoolean({ field: 'whatsapp', fieldName: 'Whatsapp' });

const validateCountry = () => validateRequiredString({ field: 'country', fieldName: 'Country', max: 128 });

const validateCity = () => validateRequiredString({ field: 'city', fieldName: 'City', max: 128 });

const validatePostalCode = () => validateNumber({
  field: 'postal_code', fieldName: 'PostalCode', min: 8, max: 9,
})
  .custom(async (value: string) => {
    const apiResponse: any = JSON.parse(await (
      await got(
        `https://cep.awesomeapi.com.br/json/${value}`,
        { throwHttpErrors: false },
      )
    ).body);
    if (typeof apiResponse.status !== 'undefined') return Promise.reject();
  });

const validateAddress = () => validateRequiredString({ field: 'address', fieldName: 'Address', max: 128 });

const customerValidators = [
  validateName(), validateEmail(), validateEmailConfirm(), validateCpf(),
  validateCellphone(), validateBirthdate(), validateEmailSms(), validateWhatsapp(),
  validateCountry(), validateCity(), validatePostalCode(), validateAddress(),
];
export default customerValidators;
