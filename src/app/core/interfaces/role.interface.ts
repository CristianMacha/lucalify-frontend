import { RoleAccess } from "./role-access.interface";
import { User } from "./user.interface";

export interface Role {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  users: User[];
  roleAccess: RoleAccess[];
}
