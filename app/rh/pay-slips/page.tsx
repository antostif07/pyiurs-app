import apiGetData from "@/src/actions/apiGetData";
import {Assignment} from "@/src/common/Assignment";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import SelectMonthToVerify from "@/src/ui/pay-slips/select-month-to-verify";
import SelectAssignment from "@/src/ui/payments/SelectAssignment";
import {PaySlip} from "@/src/ui/pay-slips/PaySlip";
import {objectToUrlParams} from "@/src/lib/objectToUrlParams";
import PaySlipRow from "@/app/rh/pay-slips/payslip-row.server";
import {getSession} from "@/src/actions/auth";

export default async function PaySlips (props: {searchParams: Promise<{search?: string, 'employee.assignment'?: string}>}) {
    const searchParams = await props.searchParams
    const urlParams = objectToUrlParams(searchParams)
    const affectations = await apiGetData<Assignment>('/assignments', 'assignments')
    const userMonthPayments = await apiGetData<PaySlip>(`/user_month_payments?${urlParams}`, 'user_month_payments')

    const session = await getSession()

    return (
         <div className="pt-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Vérifier les bulletins de paie</h1>
            </div>
             <div className="flex justify-between pt-4">
                 <div className="flex gap-8 items-center">
                     <SelectMonthToVerify />
                     {
                         session.roles?.includes('ROLE_ADMIN') && <SelectAssignment affectations={affectations['hydra:member'] || []} />
                     }
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
                 {
                     userMonthPayments['hydra:totalItems'] !== 0 && (
                         <TableFooter>
                             <TableRow>
                                 <TableCell colSpan={5}>Total</TableCell>
                                 <TableCell className="text-right">
                                     {
                                         // @ts-ignore
                                         userMonthPayments['hydra:member'].reduce((acc, v) => {
                                             return acc + v.prime
                                         }, 0).toFixed(0)
                                     } $
                                 </TableCell>
                                 <TableCell className="text-right">
                                     {
                                         userMonthPayments['hydra:member']?.reduce((acc: number, v: PaySlip) => {
                                             return acc + v.remMalade
                                         }, 0).toFixed(0)
                                     } $
                                 </TableCell>
                                 <TableCell className="text-right">
                                     {
                                         userMonthPayments['hydra:member']?.reduce((acc: number, v: PaySlip) => {
                                             return acc + v.remCC
                                         }, 0).toFixed(0)
                                     } $
                                 </TableCell>
                                 <TableCell className="text-right whitespace-nowrap">
                                     {
                                         userMonthPayments['hydra:member']?.reduce((acc: number, v: PaySlip) => {
                                             return acc + v.totalPay
                                         }, 0).toFixed(2)
                                     } $
                                 </TableCell>
                                 <TableCell className="text-right whitespace-nowrap">
                                     {
                                         userMonthPayments['hydra:member']?.reduce((acc: number, v: PaySlip) => {
                                             return acc + v.retTransport
                                         }, 0).toFixed(2)
                                     } $
                                 </TableCell>
                                 <TableCell className="text-right whitespace-nowrap">
                                     {
                                         userMonthPayments['hydra:member']?.reduce((acc: number, v: PaySlip) => {
                                             return acc + v.nap
                                         }, 0).toFixed(2)
                                     } $
                                 </TableCell>
                                 <TableCell></TableCell>
                                 <TableCell className="font-medium whitespace-nowrap">
                                     {
                                         userMonthPayments['hydra:member']?.reduce((acc: number, v: PaySlip) => {
                                             return acc + v.retRetR1
                                         }, 0).toFixed(2)
                                     } $
                                 </TableCell>
                                 <TableCell className="font-medium whitespace-nowrap">
                                     {
                                         userMonthPayments['hydra:member']?.reduce((acc: number, v: PaySlip) => {
                                             return acc + v.retRetR2
                                         }, 0).toFixed(2)
                                     } $
                                 </TableCell>
                                 <TableCell className="font-medium whitespace-nowrap">
                                     {
                                         userMonthPayments['hydra:member']?.reduce((acc: number, v: PaySlip) => {
                                             return acc + v.retAbsence
                                         }, 0).toFixed(2)
                                     } $
                                 </TableCell>
                                 <TableCell className="font-medium whitespace-nowrap">
                                     {
                                         userMonthPayments['hydra:member']?.reduce((acc: number, v: PaySlip) => {
                                             return acc + v.retMalade
                                         }, 0).toFixed(2)
                                     } $
                                 </TableCell>
                                 <TableCell className="font-medium whitespace-nowrap">
                                     {
                                         userMonthPayments['hydra:member']?.reduce((acc: number, v: PaySlip) => {
                                             return acc + v.retCCirc
                                         }, 0).toFixed(2)
                                     } $
                                 </TableCell>
                                 <TableCell className="font-medium whitespace-nowrap ">
                                     {
                                         userMonthPayments['hydra:member']?.reduce((acc: number, v: PaySlip) => {
                                             return acc + v.cCircNP
                                         }, 0).toFixed(2)
                                     } $
                                 </TableCell>
                                 <TableCell className="font-medium whitespace-nowrap">
                                     {
                                         userMonthPayments['hydra:member']?.reduce((acc: number, v: PaySlip) => {
                                             return acc + v.retSuspension
                                         }, 0).toFixed(2)
                                     } $
                                 </TableCell>
                                 <TableCell className="font-medium whitespace-nowrap">
                                     {
                                         userMonthPayments['hydra:member']?.reduce((acc: number, v: PaySlip) => {
                                             return acc + v.debtPaid
                                         }, 0).toFixed(2)
                                     } $
                                 </TableCell>
                                 <TableCell className="font-medium whitespace-nowrap">
                                     {
                                         userMonthPayments['hydra:member']?.reduce((acc: number, v: PaySlip) => {
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
    )
}