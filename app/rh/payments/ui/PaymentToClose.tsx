'use client'
import { Assignment } from "@/src/common/Assignment"
import { fetcher } from "@/src/lib/fetcher"
import SelectMonthToVerify from "@/src/ui/pay-slips/select-month-to-verify"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import useSWR from "swr"
import PaymentTabsSlip from "./PaymentTabsSlip"

export default function PaymentToClose ({dataAffectations}: {dataAffectations: Assignment[]}) {
    const [selected, setSelected] = useState({
        month: ((new Date()).getMonth() + 1).toString().length == 1 ? `0${((new Date()).getMonth() + 1).toString()}` : ((new Date()).getMonth() + 1).toString(),
        year: (new Date()).getFullYear().toString()
    })
    
    const { data, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/employee_payments?month=${selected.year}-${selected.month}`, 
        (url: string) => fetcher(url, null), {
        revalidateOnMount: true,
        async onSuccess(data, key, config) {
            console.log(data);
            // if(data.code && data.code === 401){
            //     await logout()
            //     redirect('/login', RedirectType.replace)
            // }
            
        }})
    
    const handleSelected = (e: any) => {
        setSelected({...selected, ...e})
    }
    
    return (
        <div>
            <div className="flex justify-between pt-4">
                <div className="flex gap-8 items-center">
                    <SelectMonthToVerify handleSelected={handleSelected} selected={selected} />
                    {/* <SelectAssignment affectations={dataAffectations} /> */}
                </div>
            </div>
            {
                isLoading ? (
                    <div className="flex min-h-48 justify-center items-center"><ReloadIcon className="animate-spin w-4 h-4" /></div>
                ) : data && data['hydra:totalItems'] > 0 ? (
                    <div>
                        <h4 className="my-4 font-bold">Les Bulletins</h4>
                        <PaymentTabsSlip data={data ? data['hydra:member'] : []} />
                    </div>
                ) : <div className="flex min-h-48 justify-center items-center">Aucun Bulletin trouvé pour cloturer la paie</div>
            }
        </div>
    )
}