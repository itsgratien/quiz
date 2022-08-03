import { __prod__ } from '@/utils/Constants';
import connectRedis from 'connect-redis';
import nextSession from 'next-session';
import { expressSession, promisifyStore } from 'next-session/lib/compat';
import IORedis from 'ioredis';

const RedisStore = connectRedis(expressSession);

const getSession = nextSession({
  name: 'quid',
  cookie: {
    httpOnly: true,
    secure: __prod__,
    maxAge: 1000 * 60 * 60 * 24 * 10 * 365, // 10 years
    sameSite: 'lax', // csrf protection
  },
  store: promisifyStore(new RedisStore({ client: new IORedis() })),
});

export default getSession;
