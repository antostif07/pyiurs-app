'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Employee } from "./Employee"
import { format } from "date-fns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"

export const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nom
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "assignment.name",
      header: "Affectation",
    },
    {
        accessorKey: "start_date",
        header: "Debut",
        cell: ({ cell, row }) => {
            return row.original.start_date ? format(row.original.start_date, "dd MMM yyyy") : ""
          }
    },
    {
        accessorKey: "salary",
        header: () => <div className={"text-right"}>Salaire</div>,
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
        header: () => <div className={"text-right"}>Transport</div>,
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
        accessorKey: "total_days",
        header: "Nb. Jr",
        cell: ({row}) => {
            return <div className="text-right font-medium">{row.getValue('total_days')} jr</div>
        }
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
    },
    {
        accessorKey: "job_status",
        header: "Status",
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
    },
    {
        id: "actions",
        cell: ({row}) => {
            const employee = row.original

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
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigator.clipboard.writeText(employee.id.toString())}>
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">Supprimer</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
        }
    }
  ]