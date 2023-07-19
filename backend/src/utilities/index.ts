import { Request } from 'express';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import Randomstring from 'randomstring';
import { sign } from 'jsonwebtoken';

export function getData<T>(req: Request): T {
  delete req?.body._csrf;
  return req?.body as T;
}

export function getParams<T>(req: Request): T {
  return req?.params as T;
}

export function getQuery<T>(req: Request): T {
  return req?.query as T;
}

export function empty(data: unknown): boolean {
  return (
    Object.prototype.toString.call(data) === '[object Undefined]' ||
    Object.prototype.toString.call(data) === '[object Null]'
  );
}

export function objectEmpty(object: any): boolean {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      if (object[key] === '' || empty(object[key])) {
        return true;
      }
    }
  }
  return false;
}

export function generateCsrf(req: Request): string {
  return req.csrfToken();
}

export function bcrypt(data: string): string {
  const salt = genSaltSync(10);
  return hashSync(data, salt);
}

export function bcryptCompare(passwordRequest: string, passwordDB: string): boolean {
  return compareSync(passwordRequest, passwordDB);
}

export function random(): string {
  return Randomstring.generate({
    length: 12,
    charset: 'alphanumeric',
  });
}

export function filterIdentify(id: unknown) {
  if (isNaN(id as number)) return { slug: String(id) };
  return { id: Number(id) };
}

export function generateToken(email: string): string {
  return sign({ email }, String(process.env.TOKEN_SECRET), {
    expiresIn: 1000 * 60 * 60 * 24 * 30 * 2,
  });
}
