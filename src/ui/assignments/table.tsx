'use client'
import {Table, TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { Button } from "@/components/ui/button";

export default function AssignmentTable({assignments}: {assignments: Array<{name: string}>}) {
    return (
        <Table>
            <TableCaption>Liste des boutiques</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Nom</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {assignments.map((ass, i) => (
                <TableRow key={i}>
                    <TableCell className="font-medium">{ass.name}</TableCell>
                    {/* <TableCell className="text-right">
                        <Button>Delete</Button>
                    </TableCell> */}
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