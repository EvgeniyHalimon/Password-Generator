import { Types  } from 'mongoose';

export const convertID = (id: string) => {
  return new Types.ObjectId(id);
};