import { Response, Request } from 'express';

import express from 'express';

const router = express.Router();

export class CustomError extends Error{
  status: any;
  constructor(obj){
    super(obj.message);
    this.name = 'CustomError';
    this.status = obj.status;
  }
}

const userService = require('./users.service')

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await userService.findAllUsers()
    if (!users){
      throw new CustomError({ message: `User ID ${req.body.id} not found`, status: 204 });
    } 
    res.json(users);
  } catch (error) {
    await res.status(error.status).json({ 'message': error.message });
  }
});

router.get('/user', async (req: Request, res: Response) => {
  try {
    if (!req?.body?.id){
      return new CustomError({ message: 'User ID required', status: 400 });
    }
    const user = await userService.findOneUser(req.body.id)
    if (!user){
      throw new CustomError({ message: `User ID ${req.body.id} not found`, status: 204 });
    } 
    res.json(user);
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });
  }
});

router.delete('/', async (req: Request, res: Response) => {
  try {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'User ID required' });
    const user = await userService.findOneUser(!req?.params?.id)
    if (!user){
      throw new CustomError({ message: `User ID ${req.params.id} not found`, status: 204 });
    } 
    const result = await userService.deleteOneUser(req.params.id)
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });
  }
});

module.exports = router;