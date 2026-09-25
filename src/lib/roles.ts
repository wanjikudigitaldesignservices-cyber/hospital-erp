// Role definitions and route access control for the Hospital ERP
export type UserRole = 'SUPER_ADMIN' | 'BRANCH_MANAGER' | 'DOCTOR' | 'NURSE' | 'PHARMACIST' | 'RECEPTIONIST';

export interface NavItem {
  name: string;
  href: string;
  icon: string;
  roles: UserRole[];
}

// Define which roles can access which ERP navigation items
export const NAV_ITEMS: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: '📊',
    roles: ['SUPER_ADMIN', 'BRANCH_MANAGER', 'DOCTOR', 'NURSE', 'PHARMACIST', 'RECEPTIONIST'],
  },
  {
    name: 'Patients',
    href: '/patients',
    icon: '🏥',
    roles: ['SUPER_ADMIN', 'BRANCH_MANAGER', 'DOCTOR', 'NURSE', 'RECEPTIONIST'],
  },
  {
    name: 'Appointments',
    href: '/appointments',
    icon: '📅',
    roles: ['SUPER_ADMIN', 'BRANCH_MANAGER', 'DOCTOR', 'NURSE', 'RECEPTIONIST'],
  },
  {
    name: 'Pharmacy',
    href: '/inventory',
    icon: '💊',
    roles: ['SUPER_ADMIN', 'BRANCH_MANAGER', 'PHARMACIST'],
  },
  {
    name: 'Billing',
    href: '/billing',
    icon: '💰',
    roles: ['SUPER_ADMIN', 'BRANCH_MANAGER', 'RECEPTIONIST'],
  },
  {
    name: 'Staff (HR)',
    href: '/staff',
    icon: '👥',
    roles: ['SUPER_ADMIN', 'BRANCH_MANAGER'],
  },
];

// Map of protected routes to the roles that can access them
export const ROUTE_ACCESS: Record<string, UserRole[]> = {
  '/dashboard': ['SUPER_ADMIN', 'BRANCH_MANAGER', 'DOCTOR', 'NURSE', 'PHARMACIST', 'RECEPTIONIST'],
  '/patients': ['SUPER_ADMIN', 'BRANCH_MANAGER', 'DOCTOR', 'NURSE', 'RECEPTIONIST'],
  '/appointments': ['SUPER_ADMIN', 'BRANCH_MANAGER', 'DOCTOR', 'NURSE', 'RECEPTIONIST'],
  '/inventory': ['SUPER_ADMIN', 'BRANCH_MANAGER', 'PHARMACIST'],
  '/billing': ['SUPER_ADMIN', 'BRANCH_MANAGER', 'RECEPTIONIST'],
  '/staff': ['SUPER_ADMIN', 'BRANCH_MANAGER'],
};

// Role display names
export const ROLE_LABELS: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super Admin',
  BRANCH_MANAGER: 'Branch Manager',
  DOCTOR: 'Doctor',
  NURSE: 'Nurse',
  PHARMACIST: 'Pharmacist',
  RECEPTIONIST: 'Receptionist',
};

// Default landing page per role after login
export const ROLE_LANDING: Record<UserRole, string> = {
  SUPER_ADMIN: '/dashboard',
  BRANCH_MANAGER: '/dashboard',
  DOCTOR: '/appointments',
  NURSE: '/appointments',
  PHARMACIST: '/inventory',
  RECEPTIONIST: '/patients',
};

export function getNavItemsForRole(role: UserRole): NavItem[] {
  return NAV_ITEMS.filter((item) => item.roles.includes(role));
}

export function canAccessRoute(role: UserRole, pathname: string): boolean {
  // Find the matching route pattern
  const matchedRoute = Object.keys(ROUTE_ACCESS).find((route) => pathname.startsWith(route));
  if (!matchedRoute) return false;
  return ROUTE_ACCESS[matchedRoute].includes(role);
}
