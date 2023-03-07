import { Document, ObjectId } from 'mongoose';

export interface IEncryptedPassword{
    iv: string,
    password: string,
}

export interface IEncryptedPasswordObject{
    id?: string,
    userId: ObjectId ,
    password: IEncryptedPassword,
    applicationName: string
}

export interface IDecryptedPasswordObject extends Omit<IEncryptedPasswordObject, 'password'> {
    password: string
}

export interface IPasswordDoc extends IEncryptedPassword, Document {}

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