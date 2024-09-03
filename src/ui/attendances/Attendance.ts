import { Employee } from "../employees/Employee";

export interface Attendance {
    id: number;
    date_id: string;
    attendanceDateTime: string;
    employee: Employee;
    isValid?: boolean;
    observation?: string;
    payroll_deduction_percent?: number;
    status: "PRESENT" | "REPOS" | "R -1" | "R -2" | "RETARD" | "ABSENT" | "MALADE" | "CONGE CIRC" | "CONGE CIRC NP" | "SUSPENSION";
    managerStatus?: "PRESENT" | "REPOS" | "RETARD" | "ABSENT" | "MALADE" | "CONGE CIRC" | "CONGE CIRC NP" | "SUSPENSION";
    rhStatus: "PRESENT" | "REPOS" | "RETARD" | "ABSENT" | "MALADE" | "CONGE CIRC" | "CONGE CIRC NP" | "SUSPENSION";
    createdAt: string;
    mediaFile?: {contentUrl: string;};
    assignmentName: string;
    employeeName: string;
}