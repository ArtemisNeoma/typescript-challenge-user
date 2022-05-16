import { Request } from 'express';

const addContext = (req: Request, context: Object) => {
  const reqContext = { req, context };
  return reqContext;
};

// Joi.ref(`$${Joi.ref('.')}.min`)

export default addContext;
