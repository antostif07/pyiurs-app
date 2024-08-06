import { Assignment } from "./Assignment";

export interface Employee {
    id: number;
    name: string;
    assignment: Assignment;
    created_at: string;
    address?: string;
    start_date?: string;
    salary: number;
    total_days: number;
    transportFee: number;
    email?: string;
    tel?: string;
    matricule?: string;
    employee_function?: string;
    department?: string;
    job_status?: string;
}