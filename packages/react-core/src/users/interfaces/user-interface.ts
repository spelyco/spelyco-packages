import type { RoleInterface } from "./role-interface";

export interface UserInterface {
	id: number;
	documentId: string;
	username: string;
	email: string;
	role: RoleInterface;
}
