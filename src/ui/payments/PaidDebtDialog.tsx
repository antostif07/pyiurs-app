'use client'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import dataToFormData from "@/src/lib/dataToFormData";
import { LoaderIcon, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import  { addEmployeeDebtPayement } from "@/src/actions/employeeDebt";
import useSWR from "swr";
import { fetcher } from "@/src/lib/fetcher";
import { IEmployeeDebt } from "@/src/types/IEmployeeDebt";
import PayDebtRow from "./PayDebtRow";
import { PaySlip } from "../pay-slips/PaySlip";
import addEmployeePayment from "@/src/actions/employeePayments";

export default function PaidDebtDialog({employeeId, paySlip, month}: {employeeId: number, paySlip: PaySlip, month: string}) {
    const [open, setOpen] = useState<boolean>(false)
    const [pending, startTransition] = useTransition()
    const [formDebtPayment, setFormDebtPayment] = useState<any>([])
    const {refresh} = useRouter()

    const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/employee_debts?employee=${employeeId}`, (url: string) => fetcher(url, null), {
        revalidateOnMount: true,
        async onSuccess(data, key, config) {
            console.log(data);
            // if(data.code && data.code === 401){
            //     await logout()
            //     redirect('/login', RedirectType.replace)
            // }
        
        },
    })
    
    const debts = data && data['hydra:member'] ? data['hydra:member'] : []
      
    async function onSubmit(e: any) {
        e.preventDefault()
        
        const paymentData = {
            employee: `/api/employees/${employeeId}`,
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
            totalPay: paySlip.totalPay,
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
        }

        const formData = dataToFormData(paymentData)
        
        startTransition(async () => {
            await addEmployeePayment(formData).then((empPayment) => {
                async function processItems(array: any) {
                    for (const item of array) {
                        const fD = dataToFormData({...item, employeePayment: empPayment['@id']})
                        // Opération asynchrone
                        const result = await addEmployeeDebtPayement(fD);
                    }
                }
                if(formDebtPayment.length > 0) {
                    processItems(formDebtPayment)
                }
            })
            
            setOpen(false)

            refresh()
        })
    }
    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger asChild onClick={() => setOpen(true)}>
                <Button>
                    Payer une dette
                </Button>
            </AlertDialogTrigger>
            <AlertDialogDescription>
                Paiement de dettes
            </AlertDialogDescription>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Payer une dette</AlertDialogTitle>
                        <form onSubmit={onSubmit}>
                            <div className="grid grid-cols-3">
                                <div>Total</div>
                                <div>Reste</div>
                                <div>Montant à payer</div>
                            </div>
                            {
                                debts.map((debt: IEmployeeDebt) => (
                                    <PayDebtRow debt={debt} 
                                        key={debt["@id"]}
                                        formDebtPayment={formDebtPayment} 
                                        handleFormDebtPayment={(f: any) => setFormDebtPayment(f)} 
                                    />
                                ))
                            }
                            
                            <div className="flex justify-end gap-2 my-6" >
                                <Button disabled={pending} variant={'outline'} onClick={() => setOpen(false)}>Annuler</Button>
                                <Button type="submit" disabled={pending}>{ pending ? <LoaderIcon className="w-3 h-3 animate-spin" /> : "Ajouter"}</Button>
                            </div>
                        </form>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}