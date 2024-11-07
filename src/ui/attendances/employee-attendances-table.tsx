'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TableWrapper from "@/src/ui/table-wrapper";
import { columns } from "@/src/ui/attendances/columns";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Employee } from "../employees/Employee";
import getUser from "@/src/lib/getUser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";

const queryClient = new QueryClient()

export default function EmployeeAttendancesTable({employees} : {employees: Employee[]}) {
    const user = typeof window !== 'undefined' ? getUser() : {token: "", name: "", value: ""}
    
    const params = useSearchParams()
    
    const emps = typeof window !== 'undefined' ? (
        user.name ? employees.filter(
            (emp: Employee) => user.token === "PB" ? true : emp.assignment.name === user.token
        ) : []): []
    
    return (
        <QueryClientProvider client={queryClient}>
            <Tabs className="" defaultValue={emps[0].name}>
                <TabsList className="w-full overflow-x-scroll overflow-y-hidden flex justify-start mt-4 py-8">
                    {
                        emps.map((eD, index) => ( //@ts-ignore
                            <TabsTrigger key={index} value={eD.name}>{eD.name}</TabsTrigger>
                        ))
                    }
                </TabsList>
                {
                    emps.map((emp, index) => ( 
                        <TabsContent key={index} value={emp.name}>
                            <TableWrapper 
                                entityName={"attendances"} columns={columns} 
                                defaultFilter={[{ id: "employeeName", value: typeof window !== 'undefined' ? emp.name : ""}]}
                            />
                            {params.get('employee.assignment')}
                        </TabsContent>
                    ))
                }
            </Tabs>
        </QueryClientProvider>
    )
}