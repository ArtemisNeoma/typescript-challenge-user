import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';

const { string, number } = Joi.types();
const escapeHtmlString = (value: string, helpers: Joi.CustomHelpers) => {
  if (typeof value !== 'string') helpers.error('any.invalid');
  return sanitizeHtml(value);
};
export const stringValidation = string
  .trim()
  .custom(escapeHtmlString, 'Sanitizes HTML code included in the string for safety');