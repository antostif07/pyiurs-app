'use client'
import {Table, TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { Button } from "@/components/ui/button";

export default function EmployeesTable(
    {employees}: {
        employees: Array<{name: string, assignment: {id: number, name: string}, salary: number, transportFee: number}>
    }) {
    return (
        <Table>
            <TableCaption>Liste des Employés</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Nom</TableHead>
                    <TableHead className="w-[100px]">Affectation</TableHead>
                    <TableHead className="w-[100px]">Salaire de Base</TableHead>
                    <TableHead className="w-[100px]">Transport</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {employees.map((emp, i) => (
                <TableRow key={i}>
                    <TableCell className="font-medium">{emp.name}</TableCell>
                    <TableCell className="font-medium">{emp.assignment.name}</TableCell>
                    <TableCell className="font-medium">{emp.salary} $</TableCell>
                    <TableCell className="font-medium">{emp.transportFee} $</TableCell>
                </TableRow>
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