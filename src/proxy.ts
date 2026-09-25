import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PROTECTED_ROUTES = ['/dashboard', '/patients', '/appointments', '/inventory', '/billing', '/staff'];
const PUBLIC_ROUTES = ['/', '/login', '/services', '/about', '/contact'];

const ROUTE_ROLES: Record<string, string[]> = {
  '/dashboard': ['SUPER_ADMIN', 'BRANCH_MANAGER', 'DOCTOR', 'NURSE', 'PHARMACIST', 'RECEPTIONIST'],
  '/patients': ['SUPER_ADMIN', 'BRANCH_MANAGER', 'DOCTOR', 'NURSE', 'RECEPTIONIST'],
  '/appointments': ['SUPER_ADMIN', 'BRANCH_MANAGER', 'DOCTOR', 'NURSE', 'RECEPTIONIST'],
  '/inventory': ['SUPER_ADMIN', 'BRANCH_MANAGER', 'PHARMACIST'],
  '/billing': ['SUPER_ADMIN', 'BRANCH_MANAGER', 'RECEPTIONIST'],
  '/staff': ['SUPER_ADMIN', 'BRANCH_MANAGER'],
};

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes, API routes, and static assets
  if (
    PUBLIC_ROUTES.some((route) => pathname === route) ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if this is a protected route
  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  if (!isProtected) return NextResponse.next();

  // Get token from session
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || 'hospital-erp-secret-key-change-in-production' });

  // Not authenticated — redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check role-based access
  const userRole = token.role as string;
  const matchedRoute = Object.keys(ROUTE_ROLES).find((route) => pathname.startsWith(route));

  if (matchedRoute) {
    const allowedRoles = ROUTE_ROLES[matchedRoute];
    if (!allowedRoles.includes(userRole)) {
      // Redirect to dashboard with an unauthorized message
      return NextResponse.redirect(new URL('/dashboard?error=unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
