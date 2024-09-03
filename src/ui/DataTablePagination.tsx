'use client'

import { Table } from "@tanstack/react-table"
import PaginationNavigationComponent from "./PaginationNavigationComponent"

interface ITablePagination<TData> {
  table: Table<TData>
}

export default function DataTablePagination<TData>({table}: ITablePagination<TData>) {
    return (
      <div>
        <PaginationNavigationComponent table={table} />
        <div className="flex flex-row gap-4 justify-center mt-4">
          {/* <p>Items per page</p>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="border "
          >
            {[20, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select> */}
          <p>
            {`Page ${
              table.getState().pagination.pageIndex + 1
            } sur ${table?.getPageCount()}`}
          </p>
        </div>
      </div>
    )
}