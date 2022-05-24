import axios, { AxiosResponse } from 'axios';
import Joi from 'joi';

const getCep = async (value: string) => {
  let apiResponse: AxiosResponse;
  try {
    apiResponse = await axios.get(`https://cep.awesomeapi.com.br/json/${value}`);
    if (apiResponse.status === 200) return undefined;
  } catch (error) {
    console.log(error);
    throw new Joi.ValidationError(
      'any.invalid',
      [
        {
          message: 'any.invalid',
          path: ['postal_code'],
          type: 'any.invalid',
          context: {
            key: 'postal_code',
            label: 'postal_code',
            value,
          },
        },
      ],
      value,
    );
  }

  throw new Joi.ValidationError(
    'any.invalid',
    [
      {
        message: 'any.invalid',
        path: ['postal_code'],
        type: 'any.invalid',
        context: {
          key: 'postal_code',
          label: 'postal_code',
          value,
        },
      },
    ],
    value,
  );
};

export default getCep;
