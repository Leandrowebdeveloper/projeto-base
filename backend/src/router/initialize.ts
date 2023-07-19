import { Router, Request, Response, NextFunction } from 'express';
import { Auth } from '../Middleware/Auth';

const initialize = Router();

initialize.get('', async (req: Request, res: Response, next: NextFunction) => await Auth.initialize(req, res, next));

export default initialize;
