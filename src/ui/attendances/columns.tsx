'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Attendance } from "./Attendance"
import { formatApiDateTimeAttendance } from "@/src/lib/formatApiDateTimeAttendance"
import UpdateAttendanceFormDialog from "./update-attendance-form-dialog"
import { Badge } from "@/components/ui/badge"
import UpdateAttendanceFile from "./update-attendance-file"

type Option = {
  label: string;
  value: string;
};

export const columns: ColumnDef<Attendance>[] = [
    {
      accessorKey: "employeeName",
      header: "Nom",
      enableColumnFilter: false
    },
    {
        accessorKey: "attendanceDateTime",
        header: "Date et Heure",
        cell: ({ cell, row }) => {
            return formatApiDateTimeAttendance(row.original.attendanceDateTime)
          }
    },
    {
      accessorKey: "assignmentName",
      header: "Affectation",
      enableColumnFilter: false,
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({row: line}) => {
        const row = line.original
        
        return (
          <Badge variant={(row.status === "ABSENT") ? "destructive" : row.status === "PRESENT" ? "outline" : "default"}>
              {row.status}
          </Badge>
        )
      }
    },
    {
      accessorKey: "managerStatus",
      header: "Statut Manager",
      cell:({row: line}) => {
        const row = line.original
        
        return row.managerStatus ? (
          <Badge variant={(row.managerStatus === "ABSENT") ? "destructive" : row.managerStatus === "PRESENT" ? "outline" : "default"}>
              {row.managerStatus}
          </Badge>
        ) : ""
      }
    },
    {
      accessorKey: "observation",
      header: "Observation",
      enableColumnFilter: false,
    },
    {
      accessorKey: "mediaFile",
      header: "P. joint",
      enableColumnFilter: false,
      cell: ({row}) => {
        const attendance = row.original
        return <UpdateAttendanceFile attendance={attendance} />
      }
    },
    {
      accessorKey: "rhStatus",
      header: "Statut RH",
    },
    {
        id: "actions",
        cell: ({row}) => {
            const attendance = row.original

            return (
              attendance.status === "PRESENT" ? <p className="text-green-600">Valide</p> :<UpdateAttendanceFormDialog attendance={attendance} />
            )
        }
    }
  ]