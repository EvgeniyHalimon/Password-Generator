import express, { Response, Request } from 'express';

import { CustomRequest } from '../types/types';

import { passwordService } from './password.service';

const router = express.Router();

router.get('/all-passwords', async (req: CustomRequest, res: Response) => {
  try {
    const passwords = await passwordService.findAllUserPasswords(req.id);
    res.status(200).json(passwords);
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });    
  }
});

router.get('/', async (req: CustomRequest, res: Response) => {
  try {
    const password = await passwordService.getPassword(req.id, req.body);
    res.status(200).json(password);
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });    
  }
});

router.get('/?:applicationName', async (req: CustomRequest, res: Response) => {
  try {
    const applicationName = req.params.applicationName;
    const passwords = await passwordService.findPasswordByApplicationName(req.id, applicationName);
    res.status(200).json(passwords);
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });    
  }
});

router.post('/', async (req: CustomRequest, res: Response) => {
  try {
    await passwordService.createPassword(req.id, req.body);
    res.status(201).json({ 'success': `New password for ${req.body.applicationName} created!` });
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });
  }
});

router.put('/', async (req: Request, res: Response) => {
  try {
    const password = await passwordService.updatePassword(req.body);
    res.json(password);
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });   
  }
});

router.delete('/', async (req: Request, res: Response) => {
  try {
    await passwordService.deletePassword(req.body.id);
    res.status(204).json({ message: 'Password was deleted' });
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });   
  }
});

export default router;