import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '../Controller/UserController';
import { Auth } from '../Middleware/Auth';

const user = Router();

const userController = new UserController();

user.get(
  '',
  (req: Request, res: Response, next: NextFunction) => Auth.guard(req, res, next),
  async (req: Request, res: Response) => await userController.findAll(req, res),
);

user.get(
  '/edit',
  (req: Request, res: Response, next: NextFunction) => Auth.guard(req, res, next),
  async (req: Request, res: Response) => await userController.edit(req, res),
);

user.post(
  '',
  (req: Request, res: Response, next: NextFunction) => Auth.guard(req, res, next),
  async (req: Request, res: Response) => await userController.inset(req, res),
);

user.patch(
  '',
  (req: Request, res: Response, next: NextFunction) => Auth.guard(req, res, next),
  async (req: Request, res: Response) => await userController.modernize(req, res),
);

export default user;
