import { Employee } from "../ui/employees/Employee";

export interface IEmployeePayment {
    "@id": string;
    id: number;
    employee: Employee;
    remCC:number;
    remMalade: number;
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
    transportAbs: number;
    malade: number;
    retMalade: number;
    transportMalade: number;
    cCirc: number;
    retCCirc: number;
    transportCCirc: number;
    cCircNP: number;
    retCCircNP: number;
    transportCCircNP: number;
    suspension: number;
    retSuspension: number;
    transportSuspension: number;
    createdAt?: string;
    totalPaidDebts?: number;
    prime: number;
}