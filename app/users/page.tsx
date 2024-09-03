'use client'
import { Button } from "@/components/ui/button";
import TableWrapper from "@/src/ui/table-wrapper";
import { columns } from "@/src/ui/users/columns";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";

const queryClient = new QueryClient()

export default function UserPage() {
  return (
        <div className="pt-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Employés</h1>
                <Link href={"users/add"}>
                  <Button>Ajouter</Button>
                </Link>
            </div>
            <div className="mt-8 relative">
              <QueryClientProvider client={queryClient}>
                <TableWrapper columns={columns} entityName="users" />
              </QueryClientProvider>
            </div>
        </div>
  )
}