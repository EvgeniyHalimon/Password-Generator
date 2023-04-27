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

export interface IAccountDecrypted extends Omit<IAccount, 'password'> {
    password: string
}

export interface IAccountMeta{
    totalAccounts: number, 
    limit: number, 
    totalPages: number
}

export interface IAccountWithMeta{
    data : Array<IAccount>,
    meta: IAccountMeta
}

export interface IAccountWithMetaDoc extends IAccountWithMeta, Document {}

export interface IAccountResponce{
    accounts: Array<IAccount>,
    totalPages: number,
    totalAccounts: number,
}

export interface IAccountDecryptedResponce{
    accounts: Array<IAccountDecrypted>,
    totalPages: number,
    totalAccounts: number,
}

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