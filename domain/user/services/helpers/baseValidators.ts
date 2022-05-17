import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';
import { getFromContext } from '../../../../util/services/schemaContext';

const { string, date, boolean } = Joi.types();
const escapeHtmlString = (value: string, helpers: Joi.CustomHelpers) => {
  if (typeof value !== 'string') helpers.error('string.base');
  return sanitizeHtml(value);
};
export const stringValidation = (name: string) => string
  .trim()
  .custom(escapeHtmlString, 'Sanitizes HTML code included in the string for safety')
  .when(`$${name}.min`, {
    is: Joi.exist(),
    then: Joi.string().min(getFromContext(name, 'min')),
  })
  .when(`$${name}.max`, {
    is: Joi.exist(),
    then: Joi.string().max(getFromContext(name, 'max')),
  });

export const numberStringValidation = (name: string) => stringValidation(name)
  .min(getFromContext(name, 'min'))
  .max(getFromContext(name, 'max'))
  .replace(/\D/g, '');

export const dateValidation = (name: string) => date
  .iso()
  .max(getFromContext(name))
  .required();

export const booleanValidation = () => boolean;
