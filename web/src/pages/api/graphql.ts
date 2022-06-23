import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { resolvers } from '@/server/Resolvers/index';
import { NextApiRequest, NextApiResponse } from 'next';
import { createServer } from '@graphql-yoga/node';
import connectDB from '@/utils/Mongo';

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  createServer<{
    req: NextApiRequest;
    res: NextApiResponse;
  }>({
    endpoint: '/api/graphql',
    schema: await buildSchema({ resolvers }),
  })(req, res);
};

export default startServer;
