'use client'
import { Attendance } from "@/src/common/Attendance"
import {Table, TableBody,TableCaption,TableHead,TableHeader, TableRow as Row} from "@/components/ui/table"
import TableRow from "./table-row"
// import { Button } from "@/components/ui/button";

export default function AttendancesTable(
    {attendances}: {
        attendances: Array<Attendance>
    }) {
    return (
        <Table>
            <TableCaption>Liste des Employés</TableCaption>
            <TableHeader>
                <Row>
                    <TableHead className="whitespace-nowrap">Nom</TableHead>
                    <TableHead className="whitespace-nowrap">Date et Heure</TableHead>
                    <TableHead className="whitespace-nowrap">Statut</TableHead>
                    <TableHead className="whitespace-nowrap">Statut Manager</TableHead>
                    <TableHead className="w-[100px]">Observation</TableHead>
                    <TableHead className="whitespace-nowrap">P. Joint</TableHead>
                    <TableHead className="whitespace-nowrap">Statut RH</TableHead>
                    <TableHead className="w-[100px]">Action</TableHead>
                </Row>
            </TableHeader>
            <TableBody>
                {attendances.filter(att => att.status !== "PRESENT").map((attendance, i) => (
                    <TableRow attendance={attendance} key={i} />
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