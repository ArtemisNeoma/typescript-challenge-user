import { Request } from 'express';

const addContext = (req: Request, context: Object) => {
  const reqContext = { req, context };
  return reqContext;
};

export default addContext;
