import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';

const { string, number } = Joi.types();
};
export const stringValidation = string
  .trim()