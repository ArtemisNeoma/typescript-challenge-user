import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Users from '../../domain/user/mocks/UserMock';

class UserController {
  static createCustomer(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    Users.push(req.body);
    return res.sendStatus(201);
  }

  static getCustomers(req: Request, res: Response) {
    res.status(200).send(Users);
  }
}

export default UserController;
