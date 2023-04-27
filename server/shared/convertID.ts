import { Types  } from 'mongoose';

export const convertID = (id: string): Types.ObjectId => {
  return new Types.ObjectId(id);
};