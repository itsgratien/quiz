import { MongoClient } from 'mongodb';

const uri = process.env.DATABASE_URI || '';

export const mongoClient = new MongoClient(uri);

export const db = mongoClient.db(process.env.DATABASE_NAME);

const connect = async () => {
  try {
    await mongoClient.connect();
    return 'done';
  } catch (error) {
    console.error(error);
  }
};

export default connect;
