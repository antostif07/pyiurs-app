'use client'
import { Button } from "@/components/ui/button";
import { columns } from "@/src/ui/employees/columns";
import TableWrapper from "@/src/ui/table-wrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";

const queryClient = new QueryClient()

export default function Page() {
  return (
        <div className="pt-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Employés</h1>
                <Link href={"rh/add"}>
                  <Button>Ajouter</Button>
                </Link>
            </div>
            <div className="mt-8 relative">
              <QueryClientProvider client={queryClient}>
                <TableWrapper columns={columns} entityName="employees" />
              </QueryClientProvider>
            </div>
        </div>
  )
}