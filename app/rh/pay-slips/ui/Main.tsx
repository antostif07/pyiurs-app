'use client'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetcher } from "@/src/lib/fetcher";
import { PaySlip } from "@/src/ui/pay-slips/PaySlip";
import SelectMonthToVerify from "@/src/ui/pay-slips/select-month-to-verify";
import SelectAssignment from "@/src/ui/payments/SelectAssignment";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState, useTransition } from "react";
import useSWR from 'swr'
import PaySlipTableRow from "./PaySlipTableRow";
import getUser from "@/src/lib/getUser";

export default function Main({affectations}: {affectations: any}) {
    const dataAffectations = affectations && affectations['hydra:member'] ? affectations['hydra:member'] : []
    const [selected, setSelected] = useState({
        month: ((new Date()).getMonth() + 1).toString().length == 1 ? `0${((new Date()).getMonth() + 1).toString()}` : ((new Date()).getMonth() + 1).toString(),
        year: (new Date()).getFullYear().toString()
    })

    const user = typeof window !== 'undefined' ? getUser() : {}

    const handleSelected = (e: any) => {
        setSelected({...selected, ...e})
    }

    const { data, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/user_month_payments?search=${selected.year}-${selected.month}`, 
        (url: string) => fetcher(url, null), {
            revalidateOnMount: true,
            async onSuccess(data, key, config) {
                console.log(data);
                // if(data.code && data.code === 401){
                //     await logout()
                //     redirect('/login', RedirectType.replace)
                // }
            
        },
    })
    
    const result = data && data['hydra:member'] ? data['hydra:member'] : []
    
    const paySlips = result ? result.filter((r: PaySlip) => r.employeeAssignment === user.token) : []
    
    return (
        <div>
            <div className="flex justify-between pt-4">
                <div className="flex gap-8 items-center">
                    <SelectMonthToVerify handleSelected={handleSelected} selected={selected} />
                    <SelectAssignment affectations={dataAffectations} />
                </div>
            </div>
                <div className="mt-8 relative">
                <Table>
                    <TableCaption>Les Bulletins de paie</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="whitespace-nowrap">Nom</TableHead>
                        <TableHead className="whitespace-nowrap">Affectation</TableHead>
                        <TableHead className="whitespace-nowrap">Salaire</TableHead>
                        <TableHead className="whitespace-nowrap">Trans.</TableHead>
                        <TableHead className="whitespace-nowrap bg-blue-400 text-white">Présent</TableHead>
                        <TableHead className="whitespace-nowrap bg-blue-400 text-white">Prime</TableHead>
                        <TableHead className="whitespace-nowrap bg-blue-400 text-white">Rem. Mal</TableHead>
                        <TableHead className="whitespace-nowrap bg-blue-400 text-white">Rem. CC</TableHead>
                        <TableHead className="whitespace-nowrap bg-blue-400 text-white">Sal. Net</TableHead>
                        <TableHead className="whitespace-nowrap bg-blue-400 text-white">Transp.</TableHead>
                        <TableHead className="whitespace-nowrap bg-blue-400 text-white">NAP</TableHead>
                        <TableHead className="whitespace-nowrap">Action</TableHead>
                        <TableHead className="whitespace-nowrap bg-red-600 text-white">R-1</TableHead>
                        <TableHead className="whitespace-nowrap bg-red-600 text-white">R-2</TableHead>
                        <TableHead className="whitespace-nowrap bg-red-600 text-white">Absence</TableHead>
                        <TableHead className="whitespace-nowrap bg-red-600 text-white">Malade</TableHead>
                        <TableHead className="whitespace-nowrap bg-red-600 text-white">Congé Circ</TableHead>
                        <TableHead className="whitespace-nowrap bg-red-600 text-white">Congé C.NP</TableHead>
                        <TableHead className="whitespace-nowrap bg-red-600 text-white">Susp</TableHead>
                        <TableHead className="whitespace-nowrap bg-red-600 text-white">Dette</TableHead>
                        <TableHead className="whitespace-nowrap bg-red-600 text-white">Tot. Ret</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        isLoading ? (
                            <TableRow>
                                <TableCell colSpan={23}>
                                    <div className="min-h-48 flex justify-center items-center">
                                        <ReloadIcon className="animate-spin" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : paySlips.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={23}>
                                    <div className="min-h-48 flex justify-center items-center">
                                    Aucun Bulletin de Paie prevu pour ce mois
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : paySlips.map((paySlip: PaySlip, i: number) => (
                                <PaySlipTableRow key={i} paySlip={paySlip} month={`${selected.year}-${selected.month}`} />
                            ))
                    }
                </TableBody>
                {
                    paySlips.length !== 0 && !isLoading && (
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={5}>Total</TableCell>
                                <TableCell className="text-right">
                                    {
                                        // @ts-ignore
                                        paySlips.reduce((acc, v) => {
                                            return acc + v.prime
                                        }, 0).toFixed(0)
                                    } $
                                </TableCell>
                                <TableCell className="text-right">
                                    {
                                        paySlips.reduce((acc: number, v: PaySlip) => {
                                            return acc + v.remMalade
                                        }, 0).toFixed(0)
                                    } $
                                </TableCell>
                                <TableCell className="text-right">
                                    {
                                        paySlips.reduce((acc: number, v: PaySlip) => {
                                            return acc + v.remCC
                                        }, 0).toFixed(0)
                                    } $
                                </TableCell>
                                <TableCell className="text-right whitespace-nowrap">
                                    {
                                        paySlips.reduce((acc: number, v: PaySlip) => {
                                            return acc + v.totalPay
                                        }, 0).toFixed(2)
                                    } $
                                </TableCell>
                                <TableCell className="text-right whitespace-nowrap">
                                    {
                                        paySlips.reduce((acc: number, v: PaySlip) => {
                                            return acc + v.retTransport
                                        }, 0).toFixed(2)
                                    } $
                                </TableCell>
                                <TableCell className="text-right whitespace-nowrap">
                                    {
                                        paySlips.reduce((acc: number, v: PaySlip) => {
                                            return acc + v.nap
                                        }, 0).toFixed(2)
                                    } $
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell className="font-medium whitespace-nowrap">
                                    {
                                        paySlips.reduce((acc: number, v: PaySlip) => {
                                            return acc + v.retRetR1
                                        }, 0).toFixed(2)
                                    } $
                                </TableCell>
                                <TableCell className="font-medium whitespace-nowrap">
                                    {
                                        paySlips.reduce((acc: number, v: PaySlip) => {
                                            return acc + v.retRetR2
                                        }, 0).toFixed(2)
                                    } $
                                </TableCell>
                                <TableCell className="font-medium whitespace-nowrap">
                                    {
                                        paySlips.reduce((acc: number, v: PaySlip) => {
                                            return acc + v.retAbsence
                                        }, 0).toFixed(2)
                                    } $
                                </TableCell>
                                <TableCell className="font-medium whitespace-nowrap">
                                    {
                                        paySlips.reduce((acc: number, v: PaySlip) => {
                                            return acc + v.retMalade
                                        }, 0).toFixed(2)
                                    } $
                                </TableCell>
                                <TableCell className="font-medium whitespace-nowrap">
                                    {
                                        paySlips.reduce((acc: number, v: PaySlip) => {
                                            return acc + v.retCCirc
                                        }, 0).toFixed(2)
                                    } $
                                </TableCell>
                                <TableCell className="font-medium whitespace-nowrap ">
                                    {
                                        paySlips.reduce((acc: number, v: PaySlip) => {
                                            return acc + v.cCircNP
                                        }, 0).toFixed(2)
                                    } $
                                </TableCell>
                                <TableCell className="font-medium whitespace-nowrap">
                                    {
                                        paySlips.reduce((acc: number, v: PaySlip) => {
                                            return acc + v.retSuspension
                                        }, 0).toFixed(2)
                                    } $
                                </TableCell>
                                <TableCell className="font-medium whitespace-nowrap">
                                    {
                                        paySlips.reduce((acc: number, v: PaySlip) => {
                                            return acc + v.debtPaid
                                        }, 0).toFixed(2)
                                    } $
                                </TableCell>
                                <TableCell className="font-medium whitespace-nowrap">
                                    {
                                        paySlips.reduce((acc: number, v: PaySlip) => {
                                            return acc + v.totalRet
                                        }, 0).toFixed(2)
                                    } $
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    )
                }
            </Table>
            </div>
        </div>
    )
}