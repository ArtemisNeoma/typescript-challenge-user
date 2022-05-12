import userSchema from './helpers/userValidators';

class UserService {
  users: [object];

  constructor(users: [object]) {
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
