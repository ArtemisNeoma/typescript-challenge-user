import { Request } from 'express';
import Joi from 'joi';

export const addContext = (req: Request, context: Object) => {
  const reqContext = { req, context };
  return reqContext;
};

export const getSelfContext = (property?: string) => {
  const refPath = `$${Joi.ref('.')}`;
  return property !== undefined ? Joi.ref(refPath) : Joi.ref(`${refPath}.${property}`);
};
