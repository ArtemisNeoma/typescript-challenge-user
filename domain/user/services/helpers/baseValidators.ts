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
  .custom(escapeHtmlString, 'Sanitizes HTML code included in the string for safety');

export const numberStringValidation = (name: string) => stringValidation(name)
  .custom((value: string) => {console.log(`A-${value}: ${value.length}: ${value.length > 14}`); return value})
  .min(getFromContext(name, 'min'))
  .max(getFromContext(name, 'max'))
  .replace(/\D/g, '');

export const dateValidation = (name: string) => date
  .iso()
  .required();

export const booleanValidation = (name: string) => boolean;
