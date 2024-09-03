'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TableWrapper from "@/src/ui/table-wrapper";
import { columns } from "@/src/ui/attendances/columns";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function Page() {
    return (
        <QueryClientProvider client={queryClient}>
          <div className="pt-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Présences</h1>
                <div className="flex gap-4 items-center">
                  <Link href={"/rh/attendances/import"}>
                    <Button>Importer</Button>
                  </Link>
                </div>
            </div>  
            <div className="mt-8">
              <TableWrapper entityName={"attendances"} columns={columns} />
            </div>
          </div>
        </QueryClientProvider>
    )
}