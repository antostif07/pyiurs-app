'use client'
import { ColumnDef, Row } from "@tanstack/react-table"
import { format } from "date-fns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { User } from "./User"

const ActionCell = ({row}: {row: Row<User>}) => {
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

export const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Nom",
      cell: ({row}) => {
        const user: User = row.original

        return (
          <Link className="text-blue-500 underline" href={`/users/${user.id}`}>{user.name}</Link>
        )
      }
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        id: "actions",
        cell: ({row}) => <ActionCell row={row} />
    }
  ]