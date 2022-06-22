import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { buildSchema } from 'type-graphql';
import { resolvers } from '@/server/Resolvers/index';
import { NextApiRequest, NextApiResponse } from 'next';
import * as path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'OPTIONS') {
    return res.json({ message: 'Ok' });
  }
  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: true,
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  server.createHandler({ path: '/api/graphql' })(req, res);
};
export default startServer;
