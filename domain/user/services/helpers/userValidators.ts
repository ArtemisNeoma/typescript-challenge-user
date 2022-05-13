import Joi from 'joi';
import { stringValidation } from './baseValidators';

const { object } = Joi.types();

const userSchema = object.keys({
  full_name: stringValidation
    .min(1)
    .message('Full name lenght must be at least 1')
    .max(256)
    .message('Full name can\'t be longer than 256 characters')
    .required(),
  email: stringValidation
    .email({ tlds: false })
    .required(),
});

export default userSchema;
