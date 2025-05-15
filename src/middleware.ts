import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthenticated } from './utils/auth';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Exclude static assets and API routes
  const isStaticAsset = pathname.startsWith('/images/') || pathname.startsWith('/assets/');
  if (isStaticAsset) {
    return NextResponse.next();
  }

  // Define public routes (e.g., sign-in)
  const publicRoutes = ['/login', '/signup', '/about', '/slider'];
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // Check if the user is authenticated
  const isLoggedIn = isAuthenticated({ req: request });

  // If the user is not logged in and tries to access a protected route, redirect to /login
  if (!isLoggedIn && !isPublicRoute) {
    const signInUrl = new URL('/login', request.url);
    return NextResponse.redirect(signInUrl);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Match all routes except static assets and API routes
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|images/|assets/).*)',
  ],
};








// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { isAuthenticated } from './utils/auth';

// export async function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   // Define public routes (e.g., sign-in)
//   const publicRoutes = ['/login', '/signup'];
//   const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

//   // Check if the user is authenticated
//   const isLoggedIn = isAuthenticated({ req: request });

//   // If the user is not logged in and tries to access a protected route, redirect to /Sign/In
//   if (!isLoggedIn && !isPublicRoute) {
//     const signInUrl = new URL('/login', request.url);
//     return NextResponse.redirect(signInUrl);
//   }

//   // Allow the request to proceed
//   console.log('Allowing request to proceed');
//   return NextResponse.next();
// }

// // Match all routes except static assets and API routes
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - api/ (API routes)
//      */
//     // '/((?!_next/static|_next/image|favicon.ico|api/).*)',
//     '/((?!_next/static|_next/image|favicon.ico|api/|assets/).*)',
//   ],
// };