// Roles that exist in the system
export const ROLES = {
  FPO:    'fpo',
  ADMIN:  'admin',
  VIEWER: 'viewer',
};

// Routes each role is allowed to access (undefined = all roles allowed)
export const ROUTE_ROLES = {
  '/dashboard':     [ROLES.FPO, ROLES.ADMIN, ROLES.VIEWER],
  '/listing':       [ROLES.FPO, ROLES.ADMIN],
  '/procurement':   [ROLES.FPO, ROLES.ADMIN],
  '/inventory':     [ROLES.FPO, ROLES.ADMIN, ROLES.VIEWER],
  '/buy':           [ROLES.FPO, ROLES.ADMIN],
  '/coupons':       [ROLES.FPO, ROLES.ADMIN],
  '/broadcast':     [ROLES.FPO, ROLES.ADMIN],
  '/members':       [ROLES.FPO, ROLES.ADMIN, ROLES.VIEWER],
  '/documents':     [ROLES.FPO, ROLES.ADMIN, ROLES.VIEWER],
  '/ledger':        [ROLES.FPO, ROLES.ADMIN],
  '/advertisement': [ROLES.FPO, ROLES.ADMIN],
  '/reports':       [ROLES.FPO, ROLES.ADMIN, ROLES.VIEWER],
  '/settings':      [ROLES.FPO, ROLES.ADMIN],
};
