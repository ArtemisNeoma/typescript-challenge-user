interface IContextFieldOptions {
  min?: string | number | Date,
  max?: string | number | Date
}
interface IServiceContext {
  [index: string]: IContextFieldOptions;
}

const userContext: IServiceContext = {
  full_name: {
    min: 1,
    max: 256,
  },
  email: {},
  cpf: {
    min: 11,
    max: 14,
  },
  cellphone: {
    min: 11,
    max: 15,
  },

};

export default userContext;
