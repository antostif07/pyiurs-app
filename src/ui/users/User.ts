import { Assignment } from "../../common/Assignment";

export type Role = "ROLE_ADMIN" | "ROLE_MANAGER" | "ROLE_USER";

export interface User {
    '@id': string;
    id: number;
    name: string;
    company: Assignment;
    roles: Role[];
    email: string;
}