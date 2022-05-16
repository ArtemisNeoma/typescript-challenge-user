import { Request } from 'express';
import Joi from 'joi';
import addContext from '../../../util/services/schemaContext';
import userContext from './helpers/userContext';
import userSchema from './helpers/userValidators';

interface IUserServiceResponse {
  code: number,
  error?: Joi.ValidationError
}

class UserService {
  users: Array<object>;

  constructor(users: Array<object>) {
    this.users = users;
  }

  public async create(user: Request): Promise<IUserServiceResponse> {
    try {
      const newUser = await userSchema.validateAsync(addContext(user, userContext));
      this.users.push(newUser);
      return { code: 201 };
    } catch (err: any) {
      return { code: 422, error: err };
    }
  }
}

export default UserService;
