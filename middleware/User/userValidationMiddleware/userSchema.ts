import Joi from 'joi';

const {
  object, string, date, boolean,
} = Joi.types();

const userSchema = object.keys({
  full_name: string.required(),
  email: string.required(),
  email_confirmation: string.required(),
  cpf: string.required(),
  cellphone: string.required(),
  birthdate: date.required(),
  email_sms: boolean,
  whatsapp: boolean,
  country: string.required(),
  city: string.required(),
  postal_code: string.required(),
  address: string.required(),
}).or('email_sms', 'whatsapp').options({
  abortEarly: false,
});

export default userSchema;
