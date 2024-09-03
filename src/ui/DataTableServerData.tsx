'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {ColumnDef,flexRender,getCoreRowModel,useReactTable,getPaginationRowModel,SortingState,getSortedRowModel,ColumnFiltersState,getFilteredRowModel,PaginationState, PaginationOptions,} from "@tanstack/react-table"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import HeaderTable from "./HeaderTable"
import { ReloadIcon } from "@radix-ui/react-icons"
import DataTablePagination from "./DataTablePagination"
import DataTableHeader from "./DataTableHeader"
import { redirect } from "next/navigation"

interface IDataTableProps<TData, TValue> {
  isLoading: boolean;
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  pagination: PaginationState;
  setPagination?: Dispatch<SetStateAction<PaginationState>>;
  sorting?: SortingState;
  setSorting?: Dispatch<SetStateAction<SortingState>>;
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  emptyDataText?: string;
}

export const DEFAULT_PAGE_INDEX = 0;
export const DEFAULT_PAGE_SIZE = 30;

export function DataTableServerData<TData, TValue>({
  isLoading,
  data,
  columns,  
  pagination, setPagination,
  sorting, setSorting,
  columnFilters = [], 
  setColumnFilters,
  emptyDataText,
}: IDataTableProps<TData, TValue>) {
  
  const table = useReactTable({
    // @ts-ignore
    data: data?.['hydra:member'] ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    
    // onSortingChange: setSorting,
    // getSortedRowModel: getSortedRowModel(),
    
    // pagination config
    onPaginationChange: setPagination,
    // @ts-ignore
    pageCount: Math.ceil((data?.['hydra:totalItems'] || 0) / (pagination.pageSize)),
    
    // Filter Config
    onColumnFiltersChange: setColumnFilters,
    manualFiltering: true,
    
    manualPagination: true,
    // manualSorting: true,
    state: {
      // sorting, 
      columnFilters, 
      pagination
    },
  })
  
  // to reset page index to first page
  useEffect(() => {
    if (setPagination) {
      setPagination((pagination) => ({
        pageIndex: 0,
        pageSize: pagination.pageSize,
      }));
    }
  }, [columnFilters, setPagination]);
  
  return (
    <div>
      <div className="flex items-center py-4">
        <DataTableHeader table={table} />
      </div>
      <div className="rounded-md border">
        {
          isLoading ? (
            <div className="flex w-full min-h-96 justify-center items-center">
              <ReloadIcon className="w-3 h-3 animate-spin mr-3" />
              <span>Chargement...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      // const fieldMeta = header.column.columnDef.meta;
                      
                      return (
                        <TableHead key={header.id} className="whitespace-nowrap">
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
                  table.getRowModel().rows.map((row) => {
                    const el = row.original
                    return (
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
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      {emptyDataText ?? "No results."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )
        }
      </div>
      <DataTablePagination table={table} />
      {/* <pre>{JSON.stringify(data, null, "\t")}</pre> */}
    </div>
  )
}