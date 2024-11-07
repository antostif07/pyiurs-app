'use client'
import {DataTable} from "@/src/ui/DataTable";
import {HydraCollection} from "@/src/actions/apiGetData";
import {ColumnDef} from "@tanstack/react-table";
import {useRouter} from "next/navigation";
import {Suspense, useEffect} from "react";
import {getSession} from "@/src/actions/auth";

export default function DataTableErrorWrapper<TData, TValue>({data, columns}: {data: HydraCollection<TData>, columns: ColumnDef<TData, TValue>[],}) {
    const router = useRouter()
    // @ts-ignore
    useEffect( () => {
        const fetchSession = async () => {
            const session = await getSession()

            if(!session.token) {
                session.destroy()
                router.push('/login')
            }
            if(data.code && data.code === 401) {
                session.destroy()
                router.push('/login')
            }
        }

        fetchSession().then(r => console.error(r))
    }, [])

    return (
        <Suspense fallback={<div>ok</div>}>
            <DataTable
                columns={columns} data={data['hydra:member'] || []} totalItems={data['hydra:totalItems'] || 0}
            />
        </Suspense>
    )
}