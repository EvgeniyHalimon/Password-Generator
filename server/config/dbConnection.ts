import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.set('strictQuery', false);
const connectDB = async() => {
  try {
    await mongoose.connect(process.env.DB_URL);
  } catch (error) {
    console.log('🚀 ~ file: dbConnection.ts:7 ~ connectDB ~ error', error);
  }
};

export default connectDB;