import { Button } from "@/components/ui/button";
import Link from "next/link";
import apiGetData from "@/src/actions/apiGetData";
import {Employee} from "@/src/ui/employees/Employee";
import AttendanceFilters from "@/src/ui/attendances/AttendanceFilters";
import React from "react";
import EmployeeTabs from "@/app/rh/attendances/employee-tabs.client";
import {getSession} from "@/src/actions/auth";
import AttendanceTab from "@/app/rh/attendances/attendance-tab.server";

export default async function Page(
    props: {
        searchParams: Promise<{page?: string, assignmentName?: string}>
    }) {
    const searchParams = await props.searchParams
    const bn = searchParams?.assignmentName || null
    const session = await getSession()

    const data = await apiGetData<Employee>(`/employees?${bn ? 'assignmentName='+bn : ''}`, '')
    const assignments = await apiGetData<Employee>(`/assignments`, 'assignments')

    return (
        <div className="pt-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Présences</h1>
                <div className="flex gap-4 items-center">
                    <Link href={"/rh/attendances/import"}>
                        <Button>Importer</Button>
                    </Link>
                </div>
            </div>
            <AttendanceFilters assignments={assignments['hydra:member'] || []} userRoles={session.roles || []} />
            <EmployeeTabs  employees={data['hydra:member'] || []}/>
            <AttendanceTab
                searchParams={searchParams}
            />
        </div>
    );
}

