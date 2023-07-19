import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Model } from '../Model';
import { User } from '@prisma/client';

export class Auth extends Model {
  public static guard(req: Request, res: Response, next: NextFunction) {
    if (this.getUser(req)) return next();
    const authorization = this.getHeadersAuthorization(req);
    const token: string | undefined = this.getToken(authorization);
    if (token) {
      const key: string | JwtPayload | undefined = this.isThisTokenValid(token);
      if (typeof key !== 'string' && typeof key !== 'undefined') {
        const { email } = key;
        this.setUser(req, email);
        return next();
      }
      return res.status(403).json({ error: 'Não sera possível acessar o sistema.' });
    }
    return res.status(403).json({ error: 'Efetue login para acessar o sistema.' });
  }

  public static async initialize(req: Request, res: Response, next: NextFunction) {
    const authorization = this.getHeadersAuthorization(req);
    const token: string | undefined = this.getToken(authorization);
    if (token) {
      const key: string | JwtPayload | undefined = this.isThisTokenValid(token);
      if (typeof key !== 'string' && typeof key !== 'undefined') {
        const { email } = key;
        const auth = (await this.user.findUnique({ where: { email } })) as User;
        return res.status(200).json(auth);
      }
      return res.status(200).json(null);
    }
    return res.status(200).json(null);
  }

  public static getUser(req: Request) {
    return req.session.auth;
  }

  private static async setUser(req: Request, email: string): Promise<void> {
    req.session.auth = (await this.user.findUnique({ where: { email } })) as User;
  }

  private static getHeadersAuthorization(req: Request): string | undefined {
    return req.headers?.authorization;
  }

  private static getToken(token: unknown): string | undefined {
    if (typeof token === 'string') {
      return token?.split(' ')[1];
    }
  }

  private static isThisTokenValid(token: string): string | JwtPayload | undefined {
    try {
      if (token) {
        const token$ = token.replace(/\"/g, '');
        return verify(token$, String(process.env.TOKEN_SECRET));
      }
    } catch (error) {
      return undefined;
    }
  }
}
