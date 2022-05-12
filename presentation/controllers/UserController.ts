import { Request, Response } from 'express';
import Users from '../../domain/user/mocks/UserMock';
import UserService from '../../domain/user/services/UserServices';

class UserController {
  static async createCustomer(req: Request, res: Response) {
    const userService = new UserService(Users);
    const serviceResponse = await userService.create(req.body);
    return res.status(serviceResponse.code).json(serviceResponse.error);
  }

  static getCustomers(req: Request, res: Response) {
    res.status(200).send(Users);
  }
}

export default UserController;
