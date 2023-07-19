import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';

export const verifyCsrf = ((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  return res.status(403).send('Acesso negado.');
}) as any;

export const configCookie = {
  secret: `${process.env.SESSION_SECRET}`,
  resave: false,
  saveUninitialized: false,
};

export const error_404 = (req: Request, res: Response) => {
  res.status(404).json({ error: 'Erro 404 página não encontrada.' });
};
