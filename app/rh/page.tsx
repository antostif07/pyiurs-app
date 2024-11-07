import { Button } from "@/components/ui/button";
import { columns } from "@/src/ui/employees/columns";
import Link from "next/link";
import apiGetData from "@/src/actions/apiGetData";
import DataTableErrorWrapper from "@/src/ui/DataTableErrorWrapper";

export default async function Page(
    props: {searchParams?: Promise<{ page?: string }>
}) {
    const searchParams = await props.searchParams
    const currentPage = Number(searchParams?.page) || 1

    const data = await apiGetData(`/employees?page=${currentPage}`, 'employees')

    return (
        <div className="pt-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Employés</h1>
                <Link href={"rh/add"}>
                    <Button>Ajouter</Button>
                </Link>
            </div>
            <div className="mt-8 relative">
                <DataTableErrorWrapper
                    // @ts-ignore
                    data={data} columns={columns}
                 />
            </div>
        </div>
    )
}