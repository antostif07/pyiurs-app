'use client'
import { ColumnDef, Row } from "@tanstack/react-table"
import { Employee } from "./Employee"
import { format } from "date-fns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

const ActionCell = ({row}: {row: Row<Employee>}) => {
  const employee = row.original
  const pathName = usePathname()
  const {push} = useRouter()
  
  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer" onClick={() => push(`${pathName}/${employee.id}/update`)}>
            Modifier
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">Supprimer</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}
export const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Nom",
      cell: ({row}) => {
        const employee: Employee = row.original

        return (
          <Link className="text-blue-500 underline" href={`/rh/${employee.id}`}>{employee.name}</Link>
        )
      }
    },
    {
      accessorKey: "assignment.name",
      header: "Affectation",
    },
    {
        accessorKey: "startDate",
        header: "Debut",
        cell: ({row }) => {
            return row.original.start_date ? format(row.original.start_date, "dd MMM yyyy") : ""
          }
    },
    {
        accessorKey: "salary",
        header: "Salaire",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("salary"))
            const formatted = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(amount)
       
            return <div className="text-right font-medium">{formatted}</div>
          },
    },
    {
        accessorKey: "transportFee",
        header: "Transport",
        cell: ({ row }) => {
            const tp = parseFloat(row.getValue("transportFee"))
            const formatted = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(tp)
       
            return <div className="text-right font-medium">{formatted}</div>
          },
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "tel",
        header: "Tél.",
    },
    {
        accessorKey: "matricule",
        header: "Matricule",
        enableColumnFilter: false,
    },
    {
        accessorKey: "employee_function",
        header: "Fonction",
    },
    {
        accessorKey: "department",
        header: "Dept.",
    },
    {
      accessorKey: "address",
      header: "Adresse",
      enableColumnFilter: false,
    },
    {
        id: "actions",
        cell: ({row}) => <ActionCell row={row} />
    }
  ]