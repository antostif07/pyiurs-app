import { Assignment } from "../../common/Assignment";

export interface User {
    '@id': string;
    id: number;
    name: string;
    company: Assignment;
    roles: string[];
    email: string;
}