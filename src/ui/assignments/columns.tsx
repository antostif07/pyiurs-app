'use client'
import { ColumnDef, Row } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {Assignment} from "@/src/common/Assignment";

const ActionCell = ({row}: {row: Row<Assignment>}) => {
  const assignment = row.original
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
          <DropdownMenuItem className="cursor-pointer" onClick={() => push(`${pathName}/${assignment.id}/update`)}>
            Modifier
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">Supprimer</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}
export const columns: ColumnDef<Assignment>[] = [
    {
      accessorKey: "name",
      header: "Nom",
      cell: ({row}) => {
        const assignment: Assignment = row.original

        return (
          <Link className="text-blue-500 underline" href={`/rh/assignments/${assignment.id}`}>{assignment.name}</Link>
        )
      }
    },
    {
        id: "actions",
        cell: ({row}) => <ActionCell row={row} />
    }
  ]