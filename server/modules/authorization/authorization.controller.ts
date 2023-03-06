import express, { Response, Request } from 'express';
import { validate } from 'express-validation';

import { CustomRequest } from '../../shared/types/types';

const router = express.Router();

import { authorizationService } from './authorization.service';
import { ITokens } from './types';

import { loginSchema } from './validators/loginSchema';
import { registerSchema } from './validators/registerSchema';

router.post('/login', validate(loginSchema, {}, {}), async (req: Request, res: Response) => {
  try {
    const token: ITokens = await authorizationService.login(req.body);
    // Send authorization roles and access token to username
    res.json({ refreshToken : token.refreshToken, accessToken: token.accessToken });
  } catch (error: any) {
    res.status(error.status).json({ 'message': error.message });
  }
});

router.post('/register', validate(registerSchema, {}, {}), async (req: Request, res: Response) => {
  try {
    await authorizationService.register(req.body);
    res.status(201).json({ 'success': `New username ${req.body.username} created!` });
  } catch (err: any) {
    res.status(500).json({ 'message': err.message });
  }
});

router.get('/refresh', async (req: CustomRequest, res: Response) => {
  try {
    const token: ITokens = await authorizationService.refreshToken(req.id);
    res.json({ refreshToken : token.refreshToken, accessToken: token.accessToken });
  } catch (error: any) {
    res.status(500).json({ 'message': error.message });
  }
});

export default router;