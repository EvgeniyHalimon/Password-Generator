import { Document, Types } from 'mongoose';

export interface IEncryptedPassword{
    iv: string,
    password: string,
}

export interface IPassword{
    userId: Types.ObjectId,
    password: IEncryptedPassword,
    applicationName: string
}

export interface IPasswordUpdate extends IPassword{
    id: string
}

export interface IPasswordDoc extends IPassword, Document {}

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