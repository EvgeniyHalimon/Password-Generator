import { Request } from 'express';
import { ObjectId } from 'mongoose';
;
export type Roles = 'admin' | 'user' | 'premium'

export type IDType = ObjectId | string;

export interface CustomRequest extends Request{
    id: string,
    role: Roles
}

export interface IUser{
    email: string,
    password: string,
    innerPassword: string,
    username: string,
    role?: Roles,
    _id?: string,
}

export interface IDecoded{
  userInfo: { id: string, role: Roles, },
  iat: number,
  exp: number
}