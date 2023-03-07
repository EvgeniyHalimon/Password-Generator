import express, { Response, Request } from 'express';
import { validate } from 'express-validation';

import { CustomRequest } from '../../shared/types/types';

import { passwordService } from './password.service';
import { decryptSchema } from './validators/decryptSchema';
import { passwordSchema } from './validators/passwordSchema';

const router = express.Router();

router.post('/display', validate(decryptSchema, {}, {}), async (req: CustomRequest, res: Response) => {
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

router.post('/', validate(passwordSchema, {}, {}), async (req: CustomRequest, res: Response) => {
  try {
    await passwordService.create(req.id, req.role, req.body);
    res.status(201).json({ 'success': `New password for ${req.body.applicationName} created!` });
  } catch (error) {
    res.status(error.status).json({ 'message': error.message });
  }
});

router.put('/', validate(passwordSchema, {}, {}), async (req: Request, res: Response) => {
  try {
    const password = await passwordService.update(req.body.id, req.body);
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