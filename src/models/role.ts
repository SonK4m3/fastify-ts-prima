export type Role = 'admin' | 'user' | 'editor';
export type Permission = 'read' | 'write' | 'delete';
export type RoleType = {
  [role in Role]: {
    can: Array<Permission>;
  };
};

export const roles: RoleType = {
  admin: {
    can: ['read', 'write', 'delete'],
  },
  editor: {
    can: ['read', 'write'],
  },
  user: {
    can: ['read'],
  },
};
