import { Access } from "./access.interface";
import { Role } from "./role.interface";

export interface RoleAccess {
  id: string;
  role: Role;
  access: Access;
}
