import * as mongoose from 'mongoose';

const uri = process.env.DATABASE_URI || '';

const connect = async () => {
  try {
    await mongoose.connect(uri, { dbName: process.env.DATABASE_NAME });
    return 'done';
  } catch (error) {
    console.error(error);
  }
};

export default connect;
