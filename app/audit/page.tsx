'use client'
import { Button } from "@/components/ui/button";
import { columns } from "@/src/ui/audit/columns";
import TableWrapper from "@/src/ui/table-wrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";

const queryClient = new QueryClient()

export default function Audit() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="pt-8">
          <div className="flex justify-between sm:flex-row flex-col">
              <h1 className="text-2xl font-bold mb-2">Missions D'audit</h1>
              <Link href={"audit/add"}>
                <Button>Créer une mission</Button>
              </Link>
          </div>
          <div className="mt-8">
            <TableWrapper entityName={"audits"} columns={columns} />
          </div>
      </div>
    </QueryClientProvider>
  )
}