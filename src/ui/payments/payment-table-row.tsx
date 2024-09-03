import { TableCell, TableRow as Row } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import BulletinPaie from "../attendances/BulletinPaie";

interface IRow {
    employee: any,
    sParams: {}
}

export default function PaymentTableRow({employee, sParams}: IRow) {
    const sal_by_hour = employee.ratio_sal / 8
    const presences = employee.attendances.filter((a: any) => a.status === "PRESENT").length
    const r1 = employee.attendances.filter((a: any) => a.status === "R -1").length
    const r_r1 = r1 > 0 ? r1 * sal_by_hour : 0
    const r2 = employee.attendances.filter((a: any) => a.status === "R -2").length
    const r_r2 = r2 > 0 ? r2 * sal_by_hour : 0
    const r3 = employee.attendances.filter((a: any) => a.status === "R -3").length
    const r_r3 = r3 > 0 ? r3 * sal_by_hour : 0
    const absences = employee.attendances.filter((a: any) => a.status.toUpperCase() === "ABSENT").length
    const r_absences = absences > 0 ? absences * employee.ratio_sal : 0

    const sold = employee.salary - r_r1 - r_r2 - r_r3 - r_absences
    const sold_fee = employee.transportFee - (employee.ratio_trans * absences)

    const generatePdf = () => {
        BulletinPaie({
            // @ts-ignore
            period: {from: sParams["attendanceDateTime[after]"], to: sParams["attendanceDateTime[before]"]},
            employee: employee.attendances[0].employee,
            nbr_presents: presences, ratio_sal: employee.ratio_sal, nbr_absences: absences, r_absences: r_absences,
        });
      }

    return (
        <Row>
            <TableCell className="font-medium whitespace-nowrap">{employee.name}</TableCell>
            <TableCell className="font-medium whitespace-nowrap">{employee.salary} $</TableCell>
            <TableCell className="font-medium whitespace-nowrap">{employee.total_days}</TableCell>
            <TableCell className="font-medium whitespace-nowrap">{employee.transportFee} $</TableCell>
            <TableCell className="font-medium whitespace-nowrap">{`${r_r1.toFixed(2)}$ (${r1} jr)`}</TableCell>
            <TableCell className="font-medium whitespace-nowrap">{`${r_r2.toFixed(2)}$ (${r2} jr)`}</TableCell>
            <TableCell className="font-medium whitespace-nowrap">{`${r_r3.toFixed(2)}$ (${r3} jr)`}</TableCell>
            <TableCell className="font-medium whitespace-nowrap">{`${r_absences.toFixed(2)}$ (${absences} jr)`}</TableCell>
            <TableCell className="font-medium whitespace-nowrap">{`${sold.toFixed(2)} $`}</TableCell>
            <TableCell className="font-medium whitespace-nowrap">{`${sold_fee.toFixed(2)} $`}</TableCell>
            <TableCell className="font-medium whitespace-nowrap">{`${(sold + sold_fee).toFixed(2)} $`}</TableCell>
            <TableCell className="font-medium whitespace-nowrap">
                <Button onClick={generatePdf}>
                    Bulletin
                </Button>
            </TableCell>
        </Row>
    )
}