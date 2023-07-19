import { Router, Request, Response } from 'express';
const home = Router()

home.get('', (req: Request, res: Response) => {
  res.json({ message: 'Page Home' })
})

export default home;