import { Request } from 'express';
import { ObjectId } from 'mongoose';

export type IDType = ObjectId | string

export interface ITokens{
    accessToken: string,
    refreshToken: string
}

export interface CustomRequest extends Request{
    id: IDType
}

export interface IEncryptedPassword{
    iv: string,
    password: string,
}

export interface IPasswordObject{
    id?: IDType,
    userId: IDType,
    password: IEncryptedPassword | string,
    applicationName: string
}

export interface IPasswordBody{
    password: string,
    applicationName: string
}

export interface IUser{
    email: string,
    password: string,
    innerPassword: string,
    username: string,
    role?: 'admin' | 'user' | 'premium',
    id?: IDType,
    _id?: IDType,
}