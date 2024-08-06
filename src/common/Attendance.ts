import { Employee } from "./Employee";

export interface Attendance {
    id: number;
    date_id: string;
    attendanceDateTime: string;
    employee: Employee;
    is_valid?: boolean;
    observation?: string;
    payroll_deduction_percent?: number;
    status: string;
    manager_status?: string;
    rh_status: string;
    created_at: string;
    mediaFile?: {
        contentUrl: string;
    }
}