import { IEmployeeDebt } from "./IEmployeeDebt";
import { IEmployeePayment } from "./IEmployeePayment";

export interface IEmployeeDebtPayment {
    "@id": string;
    id: number;
    employeeDebt: IEmployeeDebt;
    employeePayment: IEmployeePayment;
    amount: number;
    createdAt?: string;
}