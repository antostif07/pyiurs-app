'use client'

import { ColumnDef } from "@tanstack/react-table"
// import { formatApiDateTimeAttendance } from "@/src/lib/formatApiDateTimeAttendance"
import { Audit } from "@/src/common/Audit";
import Link from "next/link";


export const columns: ColumnDef<Audit>[] = [
    {
        accessorKey: "name",
        header: "Nom",
        cell: ({row}) => {
          const audit: Audit = row.original
  
          return (
            <Link className="text-blue-500 underline" href={`/audit/${audit.id}`}>{audit.name}</Link>
          )
        }
      },
    {
        accessorKey: "assignmentName",
        header: "Boutique",
    },
    {
        accessorKey: "start_date",
        header: "Debut",
    },
    {
        accessorKey: "segment",
        header: "Segment",
    },
    {
        accessorKey: "categories",
        header: "Categorie",
    },
  ]