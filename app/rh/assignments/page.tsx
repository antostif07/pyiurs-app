import { Button } from "@/components/ui/button";
import Link from "next/link";
import apiGetData from "@/src/actions/apiGetData";
import {DataTable} from "@/src/ui/DataTable";
import {columns} from "@/src/ui/assignments/columns";

export default async function Page() {
  const data = await apiGetData('/assignments', 'assignments')

  return (
    <div className="pt-8">
          <div className="flex justify-between">
              <h1 className="text-2xl font-bold">Affectations</h1>
              <Link href={"assignments/add"}>
                <Button>Ajouter</Button>
              </Link>
          </div>
          <div className="mt-8">
              <DataTable
                  // @ts-ignore
                  columns={columns}
                  data={data['hydra:member'] || []}
                  searchFilerPlaceholder={"Nom de la boutique"}
                  totalItems={data['hydra:totalItems'] || 0}
              />
            {/*<AssignmentTable assignments={assignments} />*/}
          </div>
      </div>
  )
}