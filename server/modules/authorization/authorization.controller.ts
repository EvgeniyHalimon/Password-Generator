import express, { Response, Request } from 'express';
import { validate } from 'express-validation';

const router = express.Router();

import { authorizationService } from './authorization.service.js';

import { loginSchema } from './validators/loginSchema.js';
import { registerSchema } from './validators/registerSchema.js';

//каким образом все эти роуты я могу использовать далее? (точнее как их правильно заимпортить)

router.post('/login', validate(loginSchema, {}, {}),async (req: Request, res: Response) => {
  try {
    const login: any = authorizationService.login(req.body);
    // Send authorization roles and access token to username
    res.json({ token: login.accessToken });
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

router.get('/refresh', async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    const refresh: any = await authorizationService.refreshToken(cookies, req.body.id);
    res.json({ refreshToken : refresh.refreshToken, accessToken: refresh.accessToken });
  } catch (error: any) {
    res.status(500).json({ 'message': error.message });
  }
});

module.exports = router;