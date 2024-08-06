'use client'
import {Table, TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { Audit } from "@/src/common/Audit"
import { format } from "date-fns"
import { usePathname, useRouter } from "next/navigation"

export default function AuditTable({audits}: {audits: Array<Audit>}) {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <Table>
            <TableCaption>Liste des Missions</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Nom</TableHead>
                    <TableHead className="w-[100px]">Boutique</TableHead>
                    <TableHead className="w-[100px]">Debut</TableHead>
                    <TableHead className="w-[100px]">Segment</TableHead>
                    <TableHead className="w-[100px]">Categories</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {audits.map((emp, i) => (
                <TableRow key={i} onClick={() => router.push(`${pathname}/${emp.id}`)} className="cursor-pointer">
                    <TableCell className="font-medium">{emp.name}</TableCell>
                    <TableCell className="font-medium">{emp.assignment.name}</TableCell>
                    <TableCell className="font-medium whitespace-nowrap">{format(emp.start_date, "dd-MM-yyyy")}</TableCell>
                    <TableCell className="font-medium">{emp.segment}</TableCell>
                    <TableCell className="font-medium">{emp.categories}</TableCell>
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