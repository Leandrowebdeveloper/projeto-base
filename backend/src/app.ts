import 'dotenv/config';
import express, { Express, NextFunction, Response, json, urlencoded } from 'express';
import session from 'express-session';
import helmet from 'helmet';
import csurf from 'csurf';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import { HttpError } from 'http-errors';
import { join } from 'path';

import home from './router/home';
import user from './router/user';
import login from './router/login';
import initialize from './router/initialize';
import { _RequisitionLimit } from './Middleware/RequisitionLimit';
import { User } from '@prisma/client';
import { configCookie, error_404, verifyCsrf } from './Middleware/functions';

declare module 'express-session' {
  interface SessionData {
    requisitionLimit: _RequisitionLimit;
    auth?: User | null;
  }
}

export class App {
  private _config!: Express;
  private readonly expire = 1000 * 60 * 60 * 24 * 30 * 2;

  constructor() {
    this.config = express();
    this.middleware();
    this.router();
  }

  protected get config(): Express {
    return this._config;
  }

  private set config(value: Express) {
    this._config = value;
  }

  private middleware(): void {
    this.config.use('/', express.static(join(__dirname, 'public')));
    this.config.use(cors());
    this.config.use(logger('dev'));
    this.config.set('trust proxy', 1);
    this.config.use(cookieParser());
    this.config.use(urlencoded({ extended: false }));
    this.config.use(helmet());
    this.config.use(json());
    this.config.use(session(configCookie));
    this.config.use(csurf({ cookie: true }));
    this.config.use(verifyCsrf);
  }

  private router(): void {
    const api = '/api';
    this.config.use(`${api}/initialize`, initialize);
    this.config.use(`${api}/`, home);
    this.config.use(`${api}/login`, login);
    this.config.use(`${api}/users`, user);
    this.config.all('*', error_404);
  }
}
