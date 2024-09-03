'use client'
import { Input } from "@/components/ui/input";
import { IEmployeeDebt } from "@/src/types/IEmployeeDebt";
import { useState } from "react";

export default function PayDebtRow(
    {debt, formDebtPayment, handleFormDebtPayment}: 
    {debt: IEmployeeDebt, formDebtPayment: {amount: string, employeeDebt: string}[], handleFormDebtPayment: any}
) {
    const [form, setForm] = useState({
        amount: '0',
        employeeDebt: debt['@id'],
    })
    return (
        <div className="grid grid-cols-3">
            <div>{debt.amount} $</div>
            <div>{debt.rest} $</div>
            <div>
                <Input 
                    value={form.amount} 
                    onChange={(e) => {
                        setForm({...form, amount: e.target.value})
                        const index = formDebtPayment.findIndex(object => object.employeeDebt === debt['@id'])
                        if(index === -1){
                            handleFormDebtPayment([...formDebtPayment, {...form, amount: e.target.value}])
                        } else {
                            const newTab = [...formDebtPayment]
                            newTab[index].amount = e.target.value
                            handleFormDebtPayment(newTab)
                        }
                    }} 
                    type="number" max={debt.rest} />
            </div>
        </div>
    )
}