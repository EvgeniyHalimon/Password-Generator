const User = require('./users.entity');

interface IUser{
  username: string,
  password: string
}

const findOne = async (id: number) => {
  return User.findOne({ _id: id }).exec();
};

const findUser = async (user: string) => {
  return User.findOne({ username: user }).exec();
};

const findAll = async () => {
  return User.find();
};

const deleteOne = async (id: string) => {
  return User.deleteOne({ _id: id });
};

const createNewUser = async(userObject: IUser) => {
  return User.create(userObject);
};


export{ findOne, findUser, findAll, deleteOne, createNewUser };
