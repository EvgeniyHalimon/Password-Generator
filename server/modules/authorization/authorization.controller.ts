import express, { Response, Request } from 'express';
import { validate } from 'express-validation';

import { CustomRequest } from '../types/types';

const router = express.Router();

import { authorizationService } from './authorization.service';

import { loginSchema } from './validators/loginSchema';
import { registerSchema } from './validators/registerSchema';

//каким образом все эти роуты я могу использовать далее? (точнее как их правильно заимпортить)

router.post('/login', validate(loginSchema, {}, {}), async (req: Request, res: Response) => {
  try {
    const token: any = await authorizationService.login(req.body);
    // Send authorization roles and access token to username
    res.json({ refreshToken : token.refreshToken, accessToken: token.accessToken });
  } catch (error: any) {
    res.status(error.status).json({ 'message': error.message });
  }
});

router.post('/register', validate(registerSchema, {}, {}), async (req: Request, res: Response) => {
  try {
    await authorizationService.newUser(req.body);
    res.status(201).json({ 'success': `New username ${req.body.username} created!` });
  } catch (err: any) {
    res.status(500).json({ 'message': err.message });
  }
});

router.get('/refresh', async (req: CustomRequest, res: Response) => {
  try {
    const token: any = await authorizationService.refreshToken(req.id);
    res.json({ refreshToken : token.refreshToken, accessToken: token.accessToken });
  } catch (error: any) {
    res.status(500).json({ 'message': error.message });
  }
});

export default router;