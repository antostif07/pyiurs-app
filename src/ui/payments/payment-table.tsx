'use client'
import {Table, TableBody,TableCaption,TableHead,TableHeader, TableRow as Row} from "@/components/ui/table"
import PaymentTableRow from "./payment-table-row"
import { Attendance } from "../attendances/Attendance";

const attendancesByEmployee = (data: Attendance[]) => {
    const restructuredData = data.reduce((acc, attendance) => {
        const employeeName = attendance.employee.name
    
        const existingEmployeeIndex = acc.findIndex(
            // @ts-ignore
          (employee) => employee.name === employeeName
        )
    
        if (existingEmployeeIndex !== -1) {
            // @ts-ignore
          acc[existingEmployeeIndex].attendances.push(attendance);
        } else {
            // @ts-ignore
          acc.push({ 
            name: employeeName, salary: attendance.employee.salary, total_days: attendance.employee.total_days,
            transportFee: attendance.employee.transportFee, 
            ratio_sal: attendance.employee.salary / 26, ratio_trans: attendance.employee.transportFee / 26,
            attendances: [attendance] 
        });
        }
    
        return acc;
      },
      []);

      return restructuredData
}

export default function PaymentTable(
    {attendances, sParams}: {
        attendances: Array<Attendance>,
        sParams: {
            "attendanceDateTime[after]"?: string, "attendanceDateTime[before]"?: string,
            "employee.assignment"?: string
        }
    }) {
    const res = attendancesByEmployee(attendances)
        
    return (
        <Table>
            <TableCaption>Liste des Employés</TableCaption>
            <TableHeader>
                <Row>
                    <TableHead className="whitespace-nowrap">Nom</TableHead>
                    <TableHead className="whitespace-nowrap">Salaire de Base</TableHead>
                    <TableHead className="whitespace-nowrap">Jr. Contra</TableHead>
                    <TableHead className="whitespace-nowrap">Transport</TableHead>
                    <TableHead className="whitespace-nowrap">R-1</TableHead>
                    <TableHead className="whitespace-nowrap">R-2</TableHead>
                    <TableHead className="whitespace-nowrap">R-3</TableHead>
                    <TableHead className="whitespace-nowrap">Abs.</TableHead>
                    <TableHead className="whitespace-nowrap">Salaire</TableHead>
                    <TableHead className="whitespace-nowrap">Transport</TableHead>
                    <TableHead className="whitespace-nowrap">NAP</TableHead>
                </Row>
            </TableHeader>
            <TableBody>
                {res.map((employee, i) => (
                    <PaymentTableRow employee={employee} key={i} sParams={sParams} />
                ))}
            </TableBody>
            {/* <TableFooter>
                <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter> */}
        </Table>
    )
}