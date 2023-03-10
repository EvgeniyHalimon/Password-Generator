import express, { Response, Request } from 'express';
import { validate } from 'express-validation';

import { CustomRequest } from '../../shared/types/types';

import { accountsService } from './accounts.service';
import { IQueries } from './types';
import { decryptSchema } from './validators/decryptSchema';
import { passwordSchema } from './validators/passwordSchema';

const router = express.Router();

router.post('/display', validate(decryptSchema, {}, {}), async (req: CustomRequest, res: Response) => {
  try {
    const account = await accountsService.decrypt(req.id, req.body.innerPassword, req.query);
    console.log('🚀 ~ file: accounts.controller.ts:15 ~ router.post ~ account:', account);
    res.status(200).json(account);
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });    
  }
});

router.get('/', async (req: CustomRequest, res: Response) => {
  try {
    const queries: IQueries = req.query as unknown as IQueries;
    const accounts = await accountsService.get(req.id, queries);
    res.status(200).json(accounts);
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });    
  }
});

router.post('/', validate(passwordSchema, {}, {}), async (req: CustomRequest, res: Response) => {
  try {
    await accountsService.create(req.id, req.role, req.body);
    res.status(201).json({ 'success': `New account for ${req.body.applicationName} created!` });
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });
  }
});

router.put('/', validate(passwordSchema, {}, {}), async (req: Request, res: Response) => {
  try {
    const account = await accountsService.update(req.body);
    res.json(account);
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });   
  }
});

router.post('/delete', async (req: Request, res: Response) => {
  try {
    await accountsService.delete(req.body.ids);
    res.status(204).json({ message: 'Account was deleted' });
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });   
  }
});

export default router;