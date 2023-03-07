
import { User } from './users.entity';

interface IUser{
  username: string,
  password: string,
  innerPassword: string,
  email: string,
}

const userRepository = {
  findUserById: async (id: string) => {
    return await User.findById(id).exec();
  },

  findUser: async (email: string) => {
    return await User.findOne({ email: email }).select('+password').exec();
  },

  findAllUsers: async () => {
    return await User.find();
  },

  deleteUser: async (id: string) => {
    return await User.deleteOne({ _id : id });
  },

  createNewUser: async(userObject: IUser) => {
    return await User.create(userObject);
  },
  
  findUserByIdForDecrypt: async (id: string) => {
    return await User.findById(id).select('+innerPassword').exec();
  },
};

export{ userRepository };
