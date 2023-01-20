const mongoose = require('mongoose');

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log('🚀 ~ file: dbConnection.ts:7 ~ connectDB ~ error', error);
  }
};

module.exports = connectDB;