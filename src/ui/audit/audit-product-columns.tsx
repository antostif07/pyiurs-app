'use client'
import { ColumnDef } from "@tanstack/react-table"
import {AuditProduct} from "@/src/common/AuditProduct";

// const ActionCell = ({row}: {row: Row<AuditProduct>}) => {
//   const employee = row.original
//   const pathName = usePathname()
//   const {push} = useRouter()
//
//   return (
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" className="h-8 w-8 p-0">
//             <span className="sr-only">Open menu</span>
//             <DotsHorizontalIcon className="h-4 w-4" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuLabel>Actions</DropdownMenuLabel>
//           <DropdownMenuItem className="cursor-pointer" onClick={() => push(`${pathName}/${employee.id}/update`)}>
//             Modifier
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem className="cursor-pointer">Supprimer</DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     )
// }
export const columns: ColumnDef<AuditProduct>[] = [
    {
      accessorKey: "id",
      header: "#"
    },
    {
      accessorKey: "status",
      header: "Statut",
    },
    {
        accessorKey: "hs_code",
        header: "Ref",
    },
    {
        accessorKey: "barcode",
        header: "Codebarre",
    },
    {
        accessorKey: "name",
        header: "Nom",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "pos_category",
        header: "Cat. PdV",
    },
    {
        accessorKey: "category",
        header: "Cat.",
    },
    {
        accessorKey: "quantity",
        header: "Qté",
    },
    {
        accessorKey: "price",
        header: "PV",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{row.getValue("price") ? formatted : ""}</div>
          },
    },
    // {
    //     accessorKey: "transportFee",
    //     header: "Transport",
    //     cell: ({ row }) => {
    //         const tp = parseFloat(row.getValue("transportFee"))
    //         const formatted = new Intl.NumberFormat("en-US", {
    //           style: "currency",
    //           currency: "USD",
    //         }).format(tp)
    //
    //         return <div className="text-right font-medium">{formatted}</div>
    //       },
    // },
    // {
    //     accessorKey: "email",
    //     header: "Email",
    // },
    // {
    //     accessorKey: "tel",
    //     header: "Tél.",
    // },
    // {
    //     accessorKey: "matricule",
    //     header: "Matricule",
    //     enableColumnFilter: false,
    // },
    // {
    //     accessorKey: "employee_function",
    //     header: "Fonction",
    // },
    // {
    //     accessorKey: "department",
    //     header: "Dept.",
    // },
    // {
    //   accessorKey: "address",
    //   header: "Adresse",
    //   enableColumnFilter: false,
    // },
    // {
    //     id: "actions",
    //     cell: ({row}) => <ActionCell row={row} />
    // }
  ]