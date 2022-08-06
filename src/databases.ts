import mongoose from 'mongoose';
import { config } from './common';

export const connect = async () => {
  return await mongoose.connect(config.MONGO_URI);
};

export default {
  connect
};
