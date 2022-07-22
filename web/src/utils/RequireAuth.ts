import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import apollo from './ApolloClient';
import * as UserTypes from '@/generated/User';

export const requireAuth = async (
  req: NextRequest,
  res: typeof NextResponse
) => {
  return res.next();
};
