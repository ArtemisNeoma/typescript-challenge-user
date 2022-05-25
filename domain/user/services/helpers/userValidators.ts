import Joi from 'joi';
import isCpfValid from '@util/validation/validateData';
import {
  booleanValidation, dateValidation, numberStringValidation, stringValidation,
} from '@util/validation/baseValidators';
import getCep from './getCep';

const { object } = Joi.types();

const emailValidation = (name: string) => stringValidation(name)
  .email({ tlds: false });

const userSchema = object.keys({
  full_name: stringValidation('full_name')
    .min(1)
    .message('Full name lenght must be at least 1')
    .max(256)
    .message('Full name can\'t be longer than 256 characters')
    .required(),
  email: emailValidation('email').required(),
  email_confirmation: emailValidation('email_confirmation')
    .valid(Joi.ref('email'))
    .required(),
  cpf: numberStringValidation('cpf')
    .custom((value, helpers) => {
      if (isCpfValid(value)) { return value; }
      return helpers.error('any.invalid');
    })
    .required(),
  cellphone: numberStringValidation('cellphone').required(),
  birthdate: dateValidation('birthdate')
    .max('now')
    .required(),
  email_sms: booleanValidation(),
  whatsapp: booleanValidation(),
  country: stringValidation('country')
    .required(),
  city: stringValidation('city')
    .required(),
  postal_code: numberStringValidation('postal_code')
    .external(getCep)
    .required(),
  address: stringValidation('address')
    .required(),
}).or('email_sms', 'whatsapp').options({
  abortEarly: false,
});

export default userSchema;
