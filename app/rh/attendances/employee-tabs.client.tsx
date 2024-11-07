'use client'
import React, {useEffect, useState} from "react";
import {Employee} from "@/src/ui/employees/Employee";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function EmployeeTabs({employees}: {employees: Employee[]}) {
    const [selectedEmployee, setSelectedEmployee] = useState<Employee|undefined>(employees[0])
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleEmployee = (employee: Employee) => {
        const params = new URLSearchParams(searchParams)
        if(employee) {
            params.set('employee', employee.id.toString())
        } else {
            params.delete('employee')
        }
        replace(`${pathname}?${params.toString()}`)
        setSelectedEmployee(employee)
    }

    useEffect(() => {
        handleEmployee(employees[0])
    }, [])

    return (
        <div className={'flex gap-3 w-full overflow-x-auto p-2 items-center'}>
            {
                employees.map((eD, index) => ( //@ts-ignore
                    <button
                        onClick={() => handleEmployee(eD)}
                        className={eD.id === selectedEmployee?.id ? "bg-white px-2 py-1 shadow-[0_3px_6px_rgba(0,0,0,0.16)] rounded-md whitespace-nowrap" : "whitespace-nowrap"} key={index}>
                        {eD.name}
                    </button>
                ))
            }
        </div>
    )
}