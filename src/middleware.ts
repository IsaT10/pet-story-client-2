import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserProfile } from './services/auth';

const AuthRoutes = ['/login', '/register'];
const RoleBasedRoutes = {
  user: ['/profile'],
  admin: ['/admin', '/profile'],
};

type TRole = keyof typeof RoleBasedRoutes;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  //   console.log(pathname);
  //   const user = {
  //     name: 'Isat',
  //     role: 'admin',
  //   };
  const user = await getUserProfile();

  //   console.log(userToken);

  //   const user = undefined;
  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  if (user?.role && RoleBasedRoutes[user?.role as TRole]) {
    const routes = RoleBasedRoutes[user?.role as TRole];
    console.log(routes);
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL('/', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profile', '/admin/:page*', '/login', '/register'],
};
