import { Request } from 'express';
import { ObjectId } from 'mongoose';

export type IDType = ObjectId | string

export interface ILoginService{
    accessToken: any
    refreshToken: any
}

export interface CustomRequest extends Request{
    id: IDType
}

export interface IPasswordObject{
    userId: IDType,
    password: {
      iv: string,
      password: string,
    },
    applicationName: string
}