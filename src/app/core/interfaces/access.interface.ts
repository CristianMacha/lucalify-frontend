import { RoleAccess } from "./role-access.interface";

export interface Access {
  id: string;
  name: string;
  path: string;
  isActive: boolean;
  roleAccess: RoleAccess[];
  order: number;
}
