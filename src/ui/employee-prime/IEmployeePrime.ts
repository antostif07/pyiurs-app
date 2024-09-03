import { Employee } from "../employees/Employee";

export interface IEmployeePrime {
    "@id": string;
    id: number;
    employee: Employee;
    description: string;
    amount: number;
    month: string;
    isPaid: boolean;
}