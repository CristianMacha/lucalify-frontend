export interface User {
  id: string;
  name: string;
  email: string;
  // password: string;
  active: boolean;
  deleted: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  // role: RoleEntity | null;
}
