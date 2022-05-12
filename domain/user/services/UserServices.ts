import userSchema from './helpers/userValidators';

class UserService {
  users: Array<object>;

  constructor(users: Array<object>) {
    this.users = users;
  }

  public async create(newUser: object): Promise<void> {
    try {
      const value = await userSchema.validateAsync(newUser);
      this.users.push(value);
    } catch (err) { console.log(err); }
  }
}

export default UserService;
