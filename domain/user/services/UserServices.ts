class UserService {
  users: [object];

  constructor(users: [object]) {
    this.users = users;
  }

  public async create(newUser: object): Promise<void> {
    try {
      this.users.push(newUser);
    } catch (err) { console.log(err); }
  }
}

export default UserService;
