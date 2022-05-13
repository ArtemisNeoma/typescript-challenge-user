import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';

interface IValidationMin {
  min: number;
}
interface IValidationMax {
  max: number
}
interface IValidationConfiguration extends IValidationMin, IValidationMax {}

const { string, date, boolean } = Joi.types();
const escapeHtmlString = (value: string, helpers: Joi.CustomHelpers) => {
  if (typeof value !== 'string') helpers.error('any.invalid');
  return sanitizeHtml(value);
};
export const stringValidation = () => string
  .trim()
  .custom(escapeHtmlString, 'Sanitizes HTML code included in the string for safety');

export const numberStringValidation = (
  { min, max }: IValidationConfiguration,
) => stringValidation()
  .min(min)
  .max(max)
  .replace(/\D/g, '')
  .pattern(new RegExp(`^\\d{${min}}$`));

export const dateValidation = () => date
  .iso()
  .required();

export const booleanValidation = () => boolean;
