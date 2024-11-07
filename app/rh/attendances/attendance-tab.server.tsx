import {objectToUrlParams} from "@/src/lib/objectToUrlParams";
import apiGetData from "@/src/actions/apiGetData";
import {Attendance} from "@/src/ui/attendances/Attendance";
import DataTableErrorWrapper from "@/src/ui/DataTableErrorWrapper";
import {columns} from "@/src/ui/attendances/columns";
import {Suspense} from "react";

const AttendanceTab = async (
    props: {
        searchParams?: { page?: string, employee?: string, attendanceDateTime?: string}
    }
) => {
    const searchParams = props.searchParams
    // const currentPage = Number(searchParams?.page) || 1

    // @ts-ignore
    const urlParams = objectToUrlParams(searchParams)

    const attendances = await apiGetData<Attendance>(
        `/attendances?${urlParams}`,
        'attendances'
    )

    return (
        <Suspense fallback={<div>ok</div>}>
            <DataTableErrorWrapper
                data={attendances} columns={columns}
            />
        </Suspense>
    )
}

export default AttendanceTab