import mongoose from 'mongoose';

import { IAccountDoc } from './types';

const { Schema } = mongoose;

const accountSchema = new Schema({
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  password: {
    type: {
      iv: String,
      password: String,
    },
    required: true,
  },
  applicationName: {
    type: String,
    required: true,
  },
});

export const Account = mongoose.model<IAccountDoc>('Account', accountSchema);