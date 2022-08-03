import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { resolvers } from '@/server/Resolvers/index';
import { NextApiRequest, NextApiResponse } from 'next';
import { createServer } from '@graphql-yoga/node';
import connectDB from '@/utils/Mongo';
import { customAuthChecker } from '@/server/Middlewares/UserMiddleware';
import getSession from '@/utils/Session';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res);

  await connectDB();
  createServer<{
    req: NextApiRequest;
    res: NextApiResponse;
  }>({
    endpoint: '/api/graphql',
    schema: await buildSchema({ resolvers, authChecker: customAuthChecker }),
    context: ({ req, res }) => ({
      req: {...req, session },
      res,
    }),
  })(req, res);
};

export default handler;
