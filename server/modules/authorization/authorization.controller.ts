import express, { Response, Request } from 'express';

const router = express.Router();

import { ILoginService } from '../../types/types.js';

const authorizationService = require('./authorization.service');

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { user, pwd } = req.body;
    const login: ILoginService = authorizationService.loginService(user, pwd);
    // Creates Secure Cookie with refresh token
    res.cookie('jwt', login.refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
    // Send authorization roles and access token to user
    res.json({ roles : login.userRoles, token: login.accessToken });
  } catch (error: any) {
    res.status(error.status).json({ 'message': error.message });
  }
});

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { user, pwd } = req.body;

    authorizationService.newUserService(user, pwd);

    res.status(201).json({ 'success': `New user ${user} created!` });
  } catch (err: any) {
    res.status(500).json({ 'message': err.message });
  }
});

router.get('/logout', async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
  res.sendStatus(204);
});

router.get('/refresh', async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    authorizationService.refreshTokenService(cookies, req.body.id);
    res.json()
  } catch (error: any) {
    res.status(500).json({ 'message': error.message });
  }
});

