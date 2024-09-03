'use client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetcher } from "@/src/lib/fetcher";
import { PaySlip } from "@/src/ui/pay-slips/PaySlip";
import SelectMonthToVerify from "@/src/ui/pay-slips/select-month-to-verify";
import SelectAssignment from "@/src/ui/payments/SelectAssignment";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState, useTransition } from "react";
import useSWR from 'swr'
import PaySlipTableRow from "./PaySlipTableRow";


export default function Main({affectations}: {affectations: any}) {
    const dataAffectations = affectations && affectations['hydra:member'] ? affectations['hydra:member'] : []
    const [selected, setSelected] = useState({
        month: ((new Date()).getMonth() + 1).toString().length == 1 ? `0${((new Date()).getMonth() + 1).toString()}` : ((new Date()).getMonth() + 1).toString(),
        year: (new Date()).getFullYear().toString()
    })

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
    
    const paySlips = data && data['hydra:member'] ? data['hydra:member'] : []
    
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
                        <TableHead className="whitespace-nowrap">Jr</TableHead>
                        <TableHead className="whitespace-nowrap bg-blue-400 text-white">Présent</TableHead>
                        <TableHead className="whitespace-nowrap bg-red-600 text-white">R-1</TableHead>
                        <TableHead className="whitespace-nowrap bg-red-600 text-white">R-2</TableHead>
                        <TableHead className="whitespace-nowrap bg-red-600 text-white">Absence</TableHead>
                        <TableHead className="whitespace-nowrap bg-red-600 text-white">Malade</TableHead>
                        <TableHead className="whitespace-nowrap bg-red-600 text-white">Congé Circ</TableHead>
                        <TableHead className="whitespace-nowrap bg-red-600 text-white">Congé C.NP</TableHead>
                        <TableHead className="whitespace-nowrap bg-red-600 text-white">Susp</TableHead>
                        <TableHead className="whitespace-nowrap bg-red-600 text-white">Dette</TableHead>
                        <TableHead className="whitespace-nowrap bg-red-600 text-white">Tot. Ret</TableHead>
                        <TableHead className="whitespace-nowrap bg-blue-400 text-white">Prime</TableHead>
                        <TableHead className="whitespace-nowrap bg-blue-400 text-white">Ind. Km</TableHead>
                        <TableHead className="whitespace-nowrap bg-blue-400 text-white">Rem. Mal</TableHead>
                        <TableHead className="whitespace-nowrap bg-blue-400 text-white">Rem. CC</TableHead>
                        <TableHead className="whitespace-nowrap bg-blue-400 text-white">Sal. Net</TableHead>
                        <TableHead className="whitespace-nowrap bg-blue-400 text-white">Transp.</TableHead>
                        <TableHead className="whitespace-nowrap bg-blue-400 text-white">NAP</TableHead>
                        <TableHead className="whitespace-nowrap">Action</TableHead>
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
                {/* <TableFooter>
                    <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter> */}
            </Table>
            </div>
        </div>
    )
}