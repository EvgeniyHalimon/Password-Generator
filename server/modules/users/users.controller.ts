import express, { Response, Request } from 'express';

import { userService } from './users.service';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await userService.findAllUsers();
    res.json(users);
  } catch (error: any) {
    res.status(error.status).json({ 'message': error.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await userService.findOneUser(req.params.id);
    res.json(user);
  } catch (error: any) {
    res.status(error.status).json({ 'message': error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.json(result);
  } catch (error: any) {
    res.status(error.status).json({ 'message': error.message });
  }
});

module.exports = router;