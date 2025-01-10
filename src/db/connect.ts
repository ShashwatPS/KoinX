import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI as string;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI || 'mongodb://localhost:27017/mydatabase');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Connection to MongoDB failed: ", error);
    process.exit(1);
  }
};

export default connectDB;
