'use client'
import { Employee } from "@/src/common/Employee"
import {Table, TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { fr } from "date-fns/locale";

export default function EmployeesTable(
    {employees}: {
        employees: Array<Employee>
    }) {

    const router = useRouter()

    return (
        <Table>
            <TableCaption>Liste des Employés</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Nom</TableHead>
                    <TableHead className="w-[100px]">Affectation</TableHead>
                    <TableHead className="w-[100px]">Salaire de Base</TableHead>
                    <TableHead className="w-[100px]">Transport</TableHead>
                    <TableHead className="w-[100px]">Nb. Jours</TableHead>
                    <TableHead className="w-[100px]">Date de debut</TableHead>
                    <TableHead className="w-[100px]">Fonction</TableHead>
                    <TableHead className="w-[100px]">Dept</TableHead>
                    <TableHead className="w-[100px]">Statut</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {employees.map((emp, i) => (
                <TableRow key={i} onClick={() => router.push(`/rh/${emp.id}`)} className="cursor-pointer">
                    <TableCell className="font-medium">{emp.name}</TableCell>
                    <TableCell className="font-medium">{emp.assignment.name}</TableCell>
                    <TableCell className="font-medium">{emp.salary} $</TableCell>
                    <TableCell className="font-medium">{emp.transportFee} $</TableCell>
                    <TableCell className="font-medium">{emp.total_days ?? 26}j</TableCell>
                    {/* @ts-ignore */}
                    <TableCell className="font-medium">{format(emp.start_date, "dd MMMM yyyy", {locale: fr})}</TableCell>
                    <TableCell className="font-medium">{emp.employee_function}</TableCell>
                    <TableCell className="font-medium">{emp.department}</TableCell>
                    <TableCell className="font-medium">{emp.job_status}</TableCell>
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