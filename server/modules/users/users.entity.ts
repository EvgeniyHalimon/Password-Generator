import mongoose from 'mongoose';

import { IUser } from '../../shared/types/types';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please use a valid address'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  innerPassword: {
    type: String,
    required: true,
    select: false,
  },
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['admin', 'user', 'premium'],
  },
});

export const User = mongoose.model<IUser>('User', userSchema);