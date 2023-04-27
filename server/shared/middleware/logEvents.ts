import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';

import { format } from 'date-fns';
import { NextFunction, Request, Response } from 'express';



export const logEvents = async (message:string, logName:string): Promise<void> => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${randomUUID()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fs.promises.mkdir(path.join(__dirname, '..', 'logs'));
    }

    await fs.promises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
  } catch (err) {
    console.log(err);
  }
};

export const logger = (req: Request, res:Response, next: NextFunction): void => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
  console.log(`${req.method} ${req.path}`);
  next();
};