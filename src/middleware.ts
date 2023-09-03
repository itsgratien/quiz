import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuth } from '@/utils/IsAuth';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const getUser = async (req: NextRequest) => {
  const c = await isAuth(req, 'middleware');

  return c ?? false;
};

export const middleware = async (req: NextRequest) => {
  if (req.nextUrl.pathname.startsWith('/m')) {
    const get = await getUser(req);
    if (!get) {
      return NextResponse.redirect(baseUrl);
    }
  }
};
