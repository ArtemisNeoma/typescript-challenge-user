import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Users from '../../domain/user/mocks/UserMock.js'

class UserController {

    createCustomer(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json( { errors: errors.mapped() } )
        }
        Users.push(req.body)
        res.end().status(200)
    }
}

export default new UserController().createCustomer