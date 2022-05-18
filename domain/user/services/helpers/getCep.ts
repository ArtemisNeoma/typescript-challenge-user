import got from 'got';
import Joi from 'joi';

const getCep = async (value: string) => {
  const apiResponse: any = JSON.parse(await (
    await got(
      `https://cep.awesomeapi.com.br/json/${value}`,
      { throwHttpErrors: false },
    )
  ).body);
  console.log(`${value} : ${apiResponse.status}`);
  if (apiResponse.status === undefined) {
    return undefined;
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
