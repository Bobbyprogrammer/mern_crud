import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to db');
  } catch (error) {
    console.log('error to Connect db', error);
  }
};
