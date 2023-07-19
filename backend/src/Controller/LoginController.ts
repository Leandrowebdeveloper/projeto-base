import { User as _User } from '@prisma/client';
import { Request, Response } from 'express';
import { Login } from '../Model/Login';
import { bcryptCompare, generateCsrf, generateToken, getData } from '../utilities';
import { RequisitionLimit } from '../Middleware/RequisitionLimit';

export class LoginController extends Login {
  public async start(req: Request, res: Response) {
    const _csrf = generateCsrf(req);
    return res.status(200).json({
      email: null,
      password: null,
      _csrf,
    });
  }

  public async init(req: Request, res: Response) {
    try {
      const data: _User = getData<_User>(req);
      const login = await this.login(data);
      this.exit();
      if (login) {
        const { password } = data;
        const isPassword = bcryptCompare(password, login.password);
        if (isPassword) {
          const { createdAt, deleted, email, isAdmin, name, slug, state, updatedAt } = login;
          const token = generateToken(email);
          return res.status(200).json({ token, createdAt, deleted, email, isAdmin, name, slug, state, updatedAt });
        }
        return this._error(req, res);
      }
      return this._error(req, res);
    } catch (error) {
      return res.status(301).json({ error });
    }
  }

  private _error(req: Request, res: Response) {
    return res.status(301).json({ error: 'Email ou senha não é valido.', requisitionLimit: RequisitionLimit.get(req) });
  }
}
