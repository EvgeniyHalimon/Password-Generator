import { Request } from 'express';
import { ObjectId } from 'mongoose';

export type IDType = ObjectId | string

export type Roles = 'admin' | 'user' | 'premium'

export interface ITokens{
    accessToken: string,
    refreshToken: string
}

export interface CustomRequest extends Request{
    id: IDType,
    role: Roles
}

export interface IEncryptedPassword{
    iv: string,
    password: string,
    _id?: IDType
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
    role?: Roles,
    id?: IDType,
    _id?: IDType,
}

export interface IQueries{
    page: number,
    limit: number,
    search: string,
    sortBy: string | any,
    sort: 'asc' | 'desc' | any,
}

export interface IDecoded{
  userInfo: { id: IDType, role: Roles, },
  iat: number,
  exp: number
}