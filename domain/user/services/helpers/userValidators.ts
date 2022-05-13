import Joi from 'joi';
import isCpfValid from '../../../../util/validation/validateData';
import { numberStringValidation, stringValidation } from './baseValidators';

const { object } = Joi.types();

const emailValidation = () => stringValidation()
  .email({ tlds: false });

const userSchema = object.keys({
  full_name: stringValidation()
    .min(1)
    .message('Full name lenght must be at least 1')
    .max(256)
    .message('Full name can\'t be longer than 256 characters')
    .required(),
  email: emailValidation().required(),
  email_confirmation: emailValidation()
    .valid(Joi.ref('email'))
    .required(),
  cpf: numberStringValidation({ min: 11, max: 14 })
    .custom((value, helpers) => {
      if (isCpfValid(value)) { return value; }
      return helpers.error('any.invalid');
    })
    .required(),
});

export default userSchema;
