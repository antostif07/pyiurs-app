import { Employee } from "../employees/Employee";

export interface Attendance {
    id: number;
    date_id: string;
    attendanceDateTime: string;
    employee: Employee;
    isValid?: boolean;
    observation?: string;
    payroll_deduction_percent?: number;
    status: "PRESENT" | "REPOS" | "RETARD" | "ABSENT" | "MALADE" | "CONGE CIRC" | "CONGE CIRC NP" | "SUSPENSION";
    manager_status?: string;
    rh_status: string;
    created_at: string;
    mediaFile?: {contentUrl: string;}
}