import express, { Response, Request } from 'express';

import { CustomRequest } from '../../shared/types/types';

import { passwordService } from './password.service';

const router = express.Router();

//! TODO: how to refactor and do i need this?

router.post('/display', async (req: CustomRequest, res: Response) => {
  try {
    const password = await passwordService.decrypt(req.id, req.body.innerPassword);
    res.status(200).json(password);
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });    
  }
});

router.get('/', async (req: CustomRequest, res: Response) => {
  try {
    const passwords = await passwordService.get(req.id, req.query);
    res.status(200).json(passwords);
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });    
  }
});

router.post('/', async (req: CustomRequest, res: Response) => {
  try {
    await passwordService.create(req.id, req.role, req.body);
    res.status(201).json({ 'success': `New password for ${req.body.applicationName} created!` });
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });
  }
});

router.put('/', async (req: Request, res: Response) => {
  try {
    const password = await passwordService.update(req.body);
    res.json(password);
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });   
  }
});

router.post('/delete', async (req: Request, res: Response) => {
  try {
    await passwordService.delete(req.body.ids);
    res.status(204).json({ message: 'Password was deleted' });
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });   
  }
});

export default router;