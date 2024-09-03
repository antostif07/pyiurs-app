import { Employee } from "../employees/Employee";

export interface UserPayment {
    id: number;
    employee: Employee;
    month: string;
    retR1: number;
    retRetR1: number;
    retR2: number;
    retRetR2: number;
    absence: number;
    retAbsence: number;
    totalRet: number;
    totalPay: number;
    nap: number;
    createdAt: string;
}