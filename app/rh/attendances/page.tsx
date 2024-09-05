import { Button } from "@/components/ui/button";
import Link from "next/link";
import TableWrapper from "@/src/ui/table-wrapper";
import { columns } from "@/src/ui/attendances/columns";
import EmployeeAttendancesTable from "@/src/ui/attendances/employee-attendances-table";


export default async function Page() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`)

  const data = await resp.json()
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
            <EmployeeAttendancesTable employees={data ? data['hydra:member'] : []} />
          </div>
    )
}