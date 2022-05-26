import Joi from 'joi';

export const getFromContext = (ref: string, property?: string) => {
  const refPath = `$${ref}`;
  return property === undefined ? Joi.ref(refPath) : Joi.ref(`${refPath}.${property}`);
};
