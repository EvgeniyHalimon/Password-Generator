import express, { Response, Request } from 'express';

import { userService } from './users.service';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await userService.findAll();
    res.json(users);
  } catch (error: any) {
    res.status(error.status).json({ 'message': error.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await userService.findByID(req.params.id);
    res.json(user);
  } catch (error: any) {
    res.status(error.status).json({ 'message': error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await userService.delete(req.params.id);
    res.send({ message: 'User was deleted' });
  } catch (error: any) {
    res.status(error.status).json({ 'message': error.message });
  }
});

export default router;