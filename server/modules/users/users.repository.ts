const User = require('./users.entity');

const findOne = async (user) => {
  return User.findOne({ username: user }).exec();
};

const findAll = async () => {
  return User.find();
};

const deleteOne = async (id) => {
  return User.deleteOne({ _id: id });
};


export{ findOne, findAll, deleteOne };
