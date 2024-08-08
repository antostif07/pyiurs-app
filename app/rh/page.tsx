import { Button } from "@/components/ui/button";
import { DataTable } from "@/src/ui/DataTable";
import { columns } from "@/src/ui/employees/columns";
import Link from "next/link";

const getData = async (params?: {page?: string | number}) => {
    const res = await fetch(`${process.env.API_URL}/employees?page=${params?.page}`, {
      headers: {
        "content-type": "application/ld+json"
      },
      next: {
        revalidate: 120
      },
    })

    const resp = await res.json()
    return resp
  }
  
export default async function Page({searchParams}: {searchParams?: {query?: string, page?:string}}) {
  const currentPage = Number(searchParams?.page) || 1;
  
  const data = await getData({page: currentPage})

    const employees = data && data['hydra:member'] ? data['hydra:member'] : []
    const totalPages = data && data['hydra:totalItems'] ? data['hydra:totalItems'] : 1
    
    return (
        <div className="pt-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Employés</h1>
                <Link href={"rh/add"}>
                  <Button>Ajouter</Button>
                </Link>
            </div>
            <div className="mt-8">
              <DataTable columns={columns} data={employees} totalPages={totalPages} />
            </div>
        </div>
    )
}