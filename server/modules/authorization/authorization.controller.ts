import express, { Response, Request } from 'express';
import { Joi, validate } from 'express-validation';

const router = express.Router();

import { ILoginService } from '../../types/types.js';

const authorizationService = require('./authorization.service');

const registerValidation = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .required(),
    password: Joi.string()
      .required(),
    innerPassword: Joi.string()
      .required(),
    username: Joi.string()
      .required(),
  }),
};

const loginValidation = {
  body: Joi.object({
    username: Joi.string()
      .required(),
    password: Joi.string()
      .required(),
  }),
};

//каким образом все эти роуты я могу использовать далее? (точнее как их правильно заимпортить)

router.post('/login', validate(loginValidation, {}, {}),async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const login: ILoginService = authorizationService.loginService(username, password);
    // Creates Secure Cookie with refresh token
    res.cookie('jwt', login.refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
    // Send authorization roles and access token to username
    res.json({ roles : login.userRoles, token: login.accessToken });
  } catch (error: any) {
    res.status(error.status).json({ 'message': error.message });
  }
});

router.post('/register', validate(registerValidation, {}, {}), async (req: Request, res: Response) => {
  try {
    const { username, password, email, innerPassword } = req.body;
    const newUserData = {
      username: username, 
      password: password, 
      email: email, 
      innerPassword: innerPassword,
    };

    await authorizationService.newUserService(newUserData);

    res.status(201).json({ 'success': `New username ${username} created!` });
  } catch (err: any) {
    res.status(500).json({ 'message': err.message });
  }
});

router.get('/logout', (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.sendStatus(204);
  } catch (error: any) {
    res.status(500).json({ 'message': error.message });
  }
});

router.get('/refresh', async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    const refresh = await authorizationService.refreshTokenService(cookies, req.body.id);
    res.json({ roles : refresh.userRoles, token: refresh.accessToken });
  } catch (error: any) {
    res.status(500).json({ 'message': error.message });
  }
});

module.exports = router;