
import { convertID } from '../../shared/convertID';
import { IDeleteResponse } from '../../shared/types/types';

import { IUserDoc } from './types';

import { User } from './users.entity';

interface IUser{
  username: string,
  password: string,
  innerPassword: string,
  email: string,
}

const userRepository = {
  findUserById: async (id: string): Promise<IUserDoc> => {
    return await User.findById(convertID(id)).exec();
  },

  findUser: async (email: string): Promise<IUserDoc> => {
    return await User.findOne({ email: email }).select('+password').exec();
  },

  findAllUsers: async (): Promise<IUserDoc[]> => {
    return await User.find();
  },

  deleteUser: async (id: string): Promise<IDeleteResponse> => {
    return await User.deleteOne({ _id : convertID(id) });
  },

  createNewUser: async(userObject: IUser): Promise<IUserDoc> => {
    return await User.create(userObject);
  },
  
  findUserByIdForDecrypt: async (id: string): Promise<IUserDoc> => {
    return await User.findById(convertID(id)).select('+innerPassword').exec();
  },
};

export{ userRepository };
