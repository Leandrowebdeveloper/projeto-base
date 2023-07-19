import { User as _User } from '@prisma/client';
import { User } from '../User';
import { loginValidator } from './validator';

export class Login extends User {
  protected async login(user: _User) {
    try {
      const db = this.validator();
      const { email } = user;
      const login = await db.user.findUnique({
        where: { email },
      });
      return login;
    } catch (error) {
      this.error(error);
    }
  }

  private validator() {
    return this.db.$extends({
      query: {
        user: {
          create({ args, query }) {
            args.data = loginValidator.parse(args.data);
            return query(args);
          },
        },
      },
    });
  }
}
