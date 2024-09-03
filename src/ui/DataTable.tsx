'use client'

import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {ColumnDef,flexRender,getCoreRowModel,useReactTable,getPaginationRowModel,SortingState,getSortedRowModel,ColumnFiltersState,getFilteredRowModel,PaginationState,} from "@tanstack/react-table"
import { useState } from "react"
import Pagination from "./DataTablePagination"
import HeaderTable from "./HeaderTable"

// declare module '@tanstack/react-table' {
//   interface TableMeta<TData extends RowData> {
//     updateData: (rowIndex: number, columnId: string, value: unknown) => void
//   }
// }

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[], 
    headColumns: {search_column: string, placeholder?: string}[],
    totalPages: number,
    defaultColumn?: Partial<ColumnDef<TData>>
    // pagination,
  }

  export function DataTable<TData, TValue>({
    columns, data, totalPages, defaultColumn, headColumns,
  }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0,pageSize: 30,})

    const table = useReactTable({
      data,
      columns,
      defaultColumn,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      onPaginationChange: setPagination,
      manualPagination: true,
      rowCount: totalPages,
      // onPaginationChange: onPaginationChange(),
      state: {
        sorting, columnFilters, pagination,
      },
    })
    
    return (
      <div>
        <div className="flex items-center py-4">
          <HeaderTable 
            table={table} 
            columns={headColumns}
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
        {/* <Pagination table={table} pagination={pagination} /> */}
        {/* <pre>{JSON.stringify(data, null, "\t")}</pre> */}
      </div>
    )
  }