import apiGetData from "@/src/actions/apiGetData";
import {Assignment} from "@/src/common/Assignment";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import SelectMonthToVerify from "@/src/ui/pay-slips/select-month-to-verify";
import SelectAssignment from "@/src/ui/payments/SelectAssignment";
import {PaySlip} from "@/src/ui/pay-slips/PaySlip";
import {objectToUrlParams} from "@/src/lib/objectToUrlParams";
import PaySlipRow from "@/app/rh/pay-slips/payslip-row.server";

export default async function PaySlips (props: {searchParams: Promise<{search?: string, 'employee.assignment'?: string}>}) {
    const searchParams = await props.searchParams
    const urlParams = objectToUrlParams(searchParams)
    const affectations = await apiGetData<Assignment>('/assignments', 'assignments')
    const userMonthPayments = await apiGetData<PaySlip>(`/user_month_payments?${urlParams}`, 'user_month_payments')

    return (
         <div className="pt-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Vérifier les bulletins de paie</h1>
            </div>
             <div className="flex justify-between pt-4">
                 <div className="flex gap-8 items-center">
                     <SelectMonthToVerify />
                     <SelectAssignment affectations={affectations['hydra:member'] || []} />
                 </div>
             </div>
             <Table className={'mt-8'}>
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
                         userMonthPayments["hydra:totalItems"] === 0 ? (
                             <TableRow>
                                 <TableCell colSpan={23}>
                                     <div className="min-h-48 flex justify-center items-center">
                                         Aucun Bulletin de Paie prevu pour ce mois
                                     </div>
                                 </TableCell>
                             </TableRow>
                         ) : (
                             userMonthPayments["hydra:member"]?.map((paySlip, index) => (
                                 <PaySlipRow
                                     key={`${paySlip.id}-${index}`}
                                     paySlip={paySlip}  month={searchParams.search || ''}
                                 />
                             ))
                         )
                     }
                 </TableBody>
             </Table>
        </div>
    )
}