import { Router, Request, Response, NextFunction } from 'express';
import { LoginController } from '../Controller/LoginController';
import { RequisitionLimit } from '../Middleware/RequisitionLimit';

const login = Router();

const loginController = new LoginController();

login.get('', async (req: Request, res: Response) => await loginController.start(req, res));

login.post(
  '',
  (req: Request, res: Response, next: NextFunction) => RequisitionLimit.initialize(req, res, next),
  async (req: Request, res: Response) => await loginController.init(req, res),
);

export default login;
