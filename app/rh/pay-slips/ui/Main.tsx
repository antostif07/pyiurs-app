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

    // const { data, isLoading } = useSWR(
    //     `${process.env.NEXT_PUBLIC_API_URL}/user_month_payments?search=${selected.year}-${selected.month}`,
    //     (url: string) => fetcher(url, null), {
    //         revalidateOnMount: true,
    //         async onSuccess(data, key, config) {
    //             // console.log(data);
    //             // if(data.code && data.code === 401){
    //             //     await logout()
    //             //     redirect('/login', RedirectType.replace)
    //             // }
    //
    //     },
    // })
    
    // const result = data && data['hydra:member'] ? data['hydra:member'] : []
    
    // const paySlips = result ? result.filter(
    //     (r: PaySlip) =>
    //         user.token === "PB" ? true : r.employeeAssignment === user.token
    // ) : []
    
    return (
        <div>

                <div className="mt-8 relative">
                <Table>
                <TableBody>
                    {/*{*/}
                    {/*    isLoading ? (*/}
                    {/*        <TableRow>*/}
                    {/*            <TableCell colSpan={23}>*/}
                    {/*                <div className="min-h-48 flex justify-center items-center">*/}
                    {/*                    <ReloadIcon className="animate-spin" />*/}
                    {/*                </div>*/}
                    {/*            </TableCell>*/}
                    {/*        </TableRow>*/}
                    {/*    ) : paySlips.length === 0 ? (*/}

                    {/*    ) : paySlips.map((paySlip: PaySlip, i: number) => (*/}

                    {/*        ))*/}
                    {/*}*/}
                </TableBody>

            </Table>
            </div>
        </div>
    )
}