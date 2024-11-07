'use client'
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import addEmployeePayment from "@/src/actions/employeePayments"
import dataToFormData from "@/src/lib/dataToFormData"
import { PaySlip } from "@/src/ui/pay-slips/PaySlip"
import PaidDebtDialog from "@/src/ui/payments/PaidDebtDialog"
import { ReloadIcon } from "@radix-ui/react-icons"
import { usePathname, useRouter } from "next/navigation"
import { useTransition } from "react"
import { z } from "zod"
import {IEmployeeDebt} from "@/src/types/IEmployeeDebt";

const FormSchema = z.object({
    employee: z.string(),
    retR1: z.number(),
    retRetR1: z.number(),
    retR2: z.number(),
    retRetR2: z.number(),
    absence: z.number(),
    retAbsence: z.number(),
    totalRet: z.number(),
    totalPay: z.number(),
    nap: z.number(),
    month: z.string(),
    remCC: z.number().optional(),
    remMalade: z.number().optional(),
    transportAbs: z.number().optional(),
    malade: z.number().optional(),
    retMalade: z.number().optional(),
    cCirc: z.number().optional(),
    transportMalade: z.number().optional(),
    retCCirc: z.number().optional(),
    transportCCirc: z.number().optional(),
    cCircNP: z.number().optional(),
    retCCircNP: z.number().optional(),
    transportCCircNP: z.number().optional(),
    suspension: z.number().optional(),
    retSuspension: z.number().optional(),
    transportSuspension: z.number().optional(),
    retTransport: z.number().optional()
  })

export default function PaySlipTableRow(
    {paySlip, month, employeeDebts,}: { paySlip: PaySlip, month: string, employeeDebts: IEmployeeDebt[]|undefined }
) {
    const [pending, startTransition] = useTransition()
    const pathname = usePathname()
    const {push} = useRouter()

    async function handleValidate(data: z.infer<typeof FormSchema>) {
        const form_data = dataToFormData(data)

        startTransition(async () => {
            await addEmployeePayment(form_data)
            push(pathname)
        })
    }

    const present = paySlip.presents > paySlip.employeeDaysOfJob ? paySlip.employeeDaysOfJob : paySlip.presents

    return (
        <TableRow>
            <TableCell className="font-medium whitespace-nowrap">{paySlip.employeeName}</TableCell>
            <TableCell className="font-medium whitespace-nowrap">{paySlip.employeeAssignment}</TableCell>
            <TableCell className="font-medium whitespace-nowrap">{paySlip.employeeSalary} $</TableCell>
            <TableCell className="font-medium whitespace-nowrap">{paySlip.employeeTransport} $</TableCell>
            <TableCell className="font-medium whitespace-nowrap bg-blue-400 text-white">{present}jr</TableCell>
            <TableCell
                className="font-medium whitespace-nowrap bg-blue-400 text-white">{`${paySlip.prime.toFixed(2)}$`}</TableCell>
            <TableCell
                className="font-medium whitespace-nowrap bg-blue-400 text-white">{`${paySlip.remMalade.toFixed(2)}$`}</TableCell>
            <TableCell
                className="font-medium whitespace-nowrap bg-blue-400 text-white">{`${paySlip.remCC.toFixed(2)}$`}</TableCell>
            <TableCell
                className="font-medium whitespace-nowrap bg-blue-400 text-white">{`${(paySlip.totalPay).toFixed(2)}$`}</TableCell>
            <TableCell
                className="font-medium whitespace-nowrap bg-blue-400 text-white">{`${paySlip.retTransport.toFixed(2)}$`}</TableCell>
            <TableCell
                className="font-medium whitespace-nowrap bg-blue-400 text-white">{`${paySlip.nap.toFixed(2)}$`}</TableCell>
            <TableCell className="whitespace-nowrap">
                {
                    paySlip.isValid ? "Bulletin Validé" :
                        paySlip.debtToPaid > 0 ?
                            <PaidDebtDialog
                                employeeId={paySlip.id} paySlip={paySlip} month={month}
                                employeeDebts={employeeDebts || []}
                            /> :
                            <Button onClick={async () => {
                                await handleValidate({
                                    employee: `/api/employees/${paySlip.id}`,
                                    remCC: paySlip.remCC,
                                    remMalade: paySlip.remMalade,
                                    month: month,
                                    retR1: paySlip.retR1,
                                    retRetR1: paySlip.retRetR1,
                                    retR2: paySlip.retR2,
                                    retRetR2: paySlip.retRetR2,
                                    absence: paySlip.absence,
                                    retAbsence: paySlip.retAbsence,
                                    totalRet: paySlip.totalRet,
                                    totalPay: paySlip.totalPay + paySlip.remMalade + paySlip.remCC,
                                    nap: paySlip.nap,
                                    transportAbs: paySlip.transportAbs,
                                    malade: paySlip.malade,
                                    retMalade: paySlip.retMalade,
                                    transportMalade: paySlip.transportMalade,
                                    cCirc: paySlip.cCirc,
                                    retCCirc: paySlip.retCCirc,
                                    transportCCirc: paySlip.transportCCirc,
                                    cCircNP: paySlip.cCircNP,
                                    retCCircNP: paySlip.retCCircNP,
                                    transportCCircNP: paySlip.transportCCircNP,
                                    suspension: paySlip.suspension,
                                    retSuspension: paySlip.retSuspension,
                                    transportSuspension: paySlip.transportSuspension,
                                    retTransport: paySlip.retTransport
                                })
                            }}>{pending ? <ReloadIcon className="animate-spin w-3 h-3"/> : "Valider"}</Button>
                }
            </TableCell>
            <TableCell
                className="font-medium whitespace-nowrap bg-red-600 text-white">{`${paySlip.retRetR1.toFixed(2)}$ (${paySlip.retR1}jr)`}</TableCell>
            <TableCell
                className="font-medium whitespace-nowrap bg-red-600 text-white">{`${paySlip.retRetR2.toFixed(2)}$ (${paySlip.retR2}jr)`}</TableCell>
            <TableCell
                className="font-medium whitespace-nowrap bg-red-600 text-white">{`${(paySlip.retAbsence + paySlip.transportAbs).toFixed(2)}$ (${paySlip.absence}jr)`}</TableCell>
            <TableCell
                className="font-medium whitespace-nowrap bg-red-600 text-white">{`${(paySlip.retMalade + paySlip.transportMalade).toFixed(2)}$ (${paySlip.malade}jr)`}</TableCell>
            <TableCell
                className="font-medium whitespace-nowrap bg-red-600 text-white">{`${(paySlip.retCCirc + paySlip.transportCCirc).toFixed(2)}$ (${paySlip.cCirc}jr)`}</TableCell>
            <TableCell
                className="font-medium whitespace-nowrap bg-red-600 text-white">{`${(paySlip.retCCircNP + paySlip.transportCCircNP).toFixed(2)}$ (${paySlip.cCircNP}jr)`}</TableCell>
            <TableCell
                className="font-medium whitespace-nowrap bg-red-600 text-white">{`${(paySlip.retSuspension + paySlip.transportSuspension).toFixed(2)}$ (${paySlip.suspension}jr)`}</TableCell>
            <TableCell
                className="font-medium whitespace-nowrap bg-red-600 text-white">{`${paySlip.debtPaid.toFixed(2)}$`}</TableCell>
            <TableCell
                className="font-medium whitespace-nowrap bg-red-600 text-white">{`${paySlip.totalRet.toFixed(2)}$`}</TableCell>
        </TableRow>
    )
}