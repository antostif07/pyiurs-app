import { Button } from "@/components/ui/button";
import { columns } from "@/src/ui/audit/columns";
import Link from "next/link";
import DataTableErrorWrapper from "@/src/ui/DataTableErrorWrapper";
import apiGetData from "@/src/actions/apiGetData";

export default async function Audit(
    props: {searchParams?: Promise<{ page?: string }> }
) {
    const searchParams = await props.searchParams
    const currentPage = Number(searchParams?.page) || 1
    const data = await apiGetData(`/audits?page=${currentPage}`, 'audits')

    return (
        <div className="pt-8">
            <div className="flex justify-between sm:flex-row flex-col">
                <h1 className="text-2xl font-bold mb-2">Missions D'audit</h1>
                <Link href={"audit/add"}>
                    <Button>Créer une mission</Button>
                </Link>
            </div>
            <div className="mt-8">
                <DataTableErrorWrapper
                    // @ts-ignore
                    data={data} columns={columns}
                />
            </div>
        </div>
    )
}