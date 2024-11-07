import PaySlipTableRow from "@/app/rh/pay-slips/ui/PaySlipTableRow";
import {PaySlip} from "@/src/ui/pay-slips/PaySlip";
import apiGetData from "@/src/actions/apiGetData";
import {IEmployeeDebt} from "@/src/types/IEmployeeDebt";

export default async function PaySlipRow(props: { paySlip: PaySlip, month: string, }) {
    const {paySlip} = props
    const employeeDebts = await apiGetData<IEmployeeDebt>(`/employee_debts?employee=${paySlip.id}`, `employee-debts-${paySlip.id}`)

    return (
        <PaySlipTableRow paySlip={paySlip} month={props.month} employeeDebts={employeeDebts['hydra:member']}/>
    )
}