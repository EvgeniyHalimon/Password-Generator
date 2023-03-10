import { Document, Types } from 'mongoose';

export interface IEncryptedPassword{
    iv: string,
    password: string,
}

export interface IAccount{
    userId: Types.ObjectId,
    password: IEncryptedPassword,
    applicationName: string
}

export interface IPasswordUpdate extends IAccount{
    id: string
}

export interface IAccountDoc extends IAccount, Document {}

export interface IPasswordBody{
    password: string,
    applicationName: string
}

export interface IQueries{
    page: number,
    limit: number,
    search: string,
    sortBy: string | any,
    sort: 'asc' | 'desc',
}

export enum Roles{
    USER = 'user',
    PREMIUM = 'premium',
    ADMIN = 'admin'
}