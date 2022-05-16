import Joi from 'joi';

export const getSelfContext = (property?: string) => {
  const refPath = `$${Joi.ref('.')}`;
  return property !== undefined ? Joi.ref(refPath) : Joi.ref(`${refPath}.${property}`);
};
