import crypto from 'crypto';

import dotenv from 'dotenv';

import { IEncryptedPassword } from '../modules/accounts/types';

dotenv.config();

const key = process.env.SECRET_KEY;

export const encrypt = (password: string): IEncryptedPassword => {
  const iv = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);

  const encryptedPassword = Buffer.concat([
    cipher.update(password),
    cipher.final(),
  ]);

  return {
    iv: iv.toString('hex'),
    password: encryptedPassword.toString('hex'),
  };
};

export const decrypt = (encryption: IEncryptedPassword): string => {
  const decipher = crypto.createDecipheriv(
    'aes-256-ctr',
    Buffer.from(key),
    Buffer.from(encryption.iv, 'hex'),
  );

  const decryptedPassword = Buffer.concat([
    decipher.update(Buffer.from(encryption.password, 'hex')),
    decipher.final(),
  ]);

  return decryptedPassword.toString();
};