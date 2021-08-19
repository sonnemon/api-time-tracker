import { app } from './app';
import mongoose from 'mongoose';
import config from './config';

const start = async () => {
  try {
    await mongoose.connect(config.mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
  app.listen(config.port, () => {
    console.log(`Listening: http://localhost:${config.port}`);
  });
};

start();
