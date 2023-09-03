import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import apollo from '@/utils/ApolloClient';
import { GetUserQuery, GetUserDocument } from '@/generated/graphql';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const isAuth = async (req: NextRequest) => {
  try {
    const find = await apollo(req as any, 'middleware').query<GetUserQuery>({
      query: GetUserDocument,
    });

    if (find.data.getUser.data) {
      return true;
    }

    return false;
  } catch (error: any) {
    return false;
  }
};

export const middleware = async (req: NextRequest) => {
  if (req.nextUrl.pathname.startsWith('/m')) {
    const get = await isAuth(req);
    if (!get) {
      return NextResponse.redirect(baseUrl);
    }
  }
};
