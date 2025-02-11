import { Assignment } from "@/src/common/Assignment"
import SelectAssignment from "@/src/ui/payments/SelectAssignment"
import SelectMonthToVerify from "@/src/ui/pay-slips/select-month-to-verify"
import { getSession } from "@/src/actions/auth"
import apiGetData from "@/src/actions/apiGetData"
import PaymentTabsSlip from "./PaymentTabsSlip"

export default async function PaymentToClose ({dataAffectations, searchParams}: {dataAffectations: Assignment[], searchParams?: string,}) {
    const session = await getSession()
    const paySlips = await apiGetData<Assignment>(`/employee_payments?${searchParams}`, 'employee_payments')

    console.log(paySlips);
    
    
    return (
        <div>
            <div className="flex justify-between pt-4">
                <div className="flex gap-8 items-center">
                    <SelectMonthToVerify />
                    {
                        session.roles?.includes('ROLE_ADMIN') && <SelectAssignment affectations={dataAffectations || []} />
                    }
                </div>
            </div>
            {
                //@ts-ignore
                paySlips && paySlips["hydra:totalItems"] > 0 ? <div>
                <h4 className="my-4 font-bold">Les Bulletins</h4>
                {/* @ts-ignore */}
                <PaymentTabsSlip data={paySlips ? paySlips['hydra:member'] : []} />
            </div> : <div className="flex min-h-48 justify-center items-center">Aucun Bulletin trouvé pour cloturer la paie</div>
            }
            {/* {
                paySlips && paySlips['hydra:totalItems'] > 0 ? (
                    <div>
                        <h4 className="my-4 font-bold">Les Bulletins</h4>
                        <PaymentTabsSlip data={paySlips ? paySlips['hydra:member'] : []} />
                    </div>
                ) : <div className="flex min-h-48 justify-center items-center">Aucun Bulletin trouvé pour cloturer la paie</div>
            } */}
        </div>
    )
}