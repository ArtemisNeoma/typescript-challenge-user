import { Request } from 'express';
import Joi from 'joi';
import userContext from './helpers/userContext';
import userSchema from './helpers/userValidators';

interface IUserServiceResponse {
  code: number,
  msg?: string | Joi.ValidationError
}

class UserService {
  users: Array<object>;

  constructor(users: Array<object>) {
    this.users = users;
  }

  public async create(user: Request): Promise<IUserServiceResponse> {
    try {
      const newUser = await userSchema.validateAsync(user, { context: userContext });
      this.users.push(newUser);
      return { code: 201, msg: 'User Created' };
    } catch (err: any) {
      return { code: 422, msg: err };
    }
  }
}

export default UserService;
