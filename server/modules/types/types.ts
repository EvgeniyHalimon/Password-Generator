import { Request } from 'express';
import { ObjectId } from 'mongoose';

export interface ILoginService{
    accessToken: any
    refreshToken: any
}

export interface CustomRequest extends Request{
    id: ObjectId
}