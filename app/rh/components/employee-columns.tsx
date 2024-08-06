"use client"

import { Employee } from "@/src/common/Employee"
import {ColumnDef} from "@tanstack/react-table"

export const employeeColumns: ColumnDef<Employee>[] = [
    {
        accessorKey: "name",
        header: "Nom"
    },
    {
        accessorKey: "assignment.name",
        header: "Affectation"
    },
]