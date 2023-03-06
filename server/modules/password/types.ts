import { Document, ObjectId } from 'mongoose';

export interface IEncryptedPassword{
    iv: string,
    password: string,
    _id?: ObjectId
}

export interface IEncryptedPasswordObject extends Document{
    _id?: ObjectId ,
    userId: ObjectId ,
    password: IEncryptedPassword,
    applicationName: string
}

export interface IDecryptedPasswordObject extends Omit<IEncryptedPasswordObject, '_id' | 'password'> {
    _id?: string,
    password: string
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
    sort: 'asc' | 'desc' | any,
}

export enum Roles{
    USER = 'user',
    PREMIUM = 'premium',
    ADMIN = 'admin'
}