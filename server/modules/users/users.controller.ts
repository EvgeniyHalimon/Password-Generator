import { Response, Request } from 'express';

import express from 'express';

const router = express.Router();

const userService = require('./users.service');

router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await userService.findAllUsers();
    res.json(users);
  } catch (error) {
    await res.status(error.status).json({ 'message': error.message });
  }
});

router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await userService.findOneUser(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });
  }
});

router.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteOneUser(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });
  }
});

module.exports = router;