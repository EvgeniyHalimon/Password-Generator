import { Document, ObjectId } from 'mongoose';

import { IUser } from '../../shared/types/types';

export interface IUserGenerateTokens extends IUser{
    _id?: ObjectId
}

export interface IUserDoc extends IUser, Document{}

export interface IUserDocResponce extends Omit<IUser, '_id'> {
    _id?: ObjectId
}