import { Employee } from "../ui/employees/Employee";

export interface IEmployeeDebt {
    "@id": string;
    id: number;
    employee: Employee;
    description: string;
    amount: number;
    totalPaid: number;
    isTotallyPaid: boolean;
    rest: number;
    createdAt?: string;
}