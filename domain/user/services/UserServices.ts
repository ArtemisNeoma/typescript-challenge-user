import { response, Response } from 'express';
import Joi from 'joi';
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

  public async create(user: object): Promise<IUserServiceResponse> {
    try {
      const newUser = await userSchema.validateAsync(user);
      this.users.push(newUser);
      return { code: 201 };
    } catch (err: any) {
      return { code: 422, error: err };
    }
  }
}

export default UserService;
