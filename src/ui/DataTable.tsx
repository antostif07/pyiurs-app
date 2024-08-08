'use client'

import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {ColumnDef,flexRender,getCoreRowModel,useReactTable,getPaginationRowModel,SortingState,getSortedRowModel,ColumnFiltersState,getFilteredRowModel,PaginationState,} from "@tanstack/react-table"
import { useState } from "react"
import Pagination from "./Pagination"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[], 
    totalPages: number,
    // pagination,
  }

  export function DataTable<TData, TValue>({
    columns, data, totalPages,
  }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0,pageSize: 30,})
    const [dataToEdit, setDataToEdit] = useState(() => [...data]);

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      onPaginationChange: setPagination,
      manualPagination: true,
      rowCount: totalPages,
      // onPaginationChange: onPaginationChange(),
      state: {
        sorting, columnFilters, pagination,
      },
      meta: {
        updateData: (rowIndex: number, columnId: string, value: string) => {
          setDataToEdit((old) =>
            old.map((row, index) => {
              if (index === rowIndex) {
                return {
                  ...old[rowIndex],
                  [columnId]: value,
                };
              }
              return row;
            })
          )
        }
      }
    })
    
    return (
      <div>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filtrer par nom..."
            value={(table.getColumn("employee_name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("employee_name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="whitespace-nowrap text-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <Pagination table={table} pagination={pagination} />
        {/* <pre>{JSON.stringify(data, null, "\t")}</pre> */}
      </div>
    )
  }