import express, { Response, Request } from 'express';

import { CustomRequest } from '../types/types';

import { passwordService } from './password.service';

const router = express.Router();

router.get('/get-passwords', async (req: CustomRequest, res: Response) => {
  try {
    const password = await passwordService.decryptPasswords(req.id, req.body);
    res.status(200).json(password);
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });    
  }
});

router.get('/', async (req: CustomRequest, res: Response) => {
  try {
    const queries = {
      page: Number(req.query.page) - 1 || 0,
      limit: Number(req.query.limit) || 5,
      search: req.query.search.toString() || '',
      sortBy: req.query.sortBy.toString() || '',
      sort: req.query.sort.toString() || 'asc',
    };
    const passwords = await passwordService.getPasswords(req.id, queries);
    res.status(200).json(passwords);
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });    
  }
});

router.post('/', async (req: CustomRequest, res: Response) => {
  try {
    await passwordService.createPassword(req.id, req.role, req.body);
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

router.post('/delete', async (req: Request, res: Response) => {
  try {
    await passwordService.deletePassword(req.body.ids);
    res.status(204).json({ message: 'Password was deleted' });
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });   
  }
});

export default router;