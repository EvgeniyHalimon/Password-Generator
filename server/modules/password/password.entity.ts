import mongoose from 'mongoose';
const { Schema } = mongoose;

const passwordSchema = new Schema({
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

export const Password = mongoose.model('Password', passwordSchema);