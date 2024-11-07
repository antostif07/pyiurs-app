'use client'
import { useEffect, useState } from 'react';
import { DataTableServerData } from './DataTableServerData';
import { ColumnDef, ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import { useDebounce } from '../lib/useDebounce';
import { useGetData } from '../actions/global';
import LoadingPage from './LoadingPage';
import getUser from '../lib/getUser';

interface ITableWrapper<TData, TValue> {
  entityName: string;
  columns: ColumnDef<TData, TValue>[];
  emptyDataText?: string;
  defaultFilter?: {id: string, value: any}[]
}
export default function TableWrapper<TData, TValue>({entityName, columns, emptyDataText, defaultFilter = []}: ITableWrapper<TData, TValue>) {
  
  return <DataTable entityName={entityName} emptyDataText='No data' columns={columns} defaultFilter={defaultFilter} />
  // return <div>data</div>
  
}

const DataTable = ({
  entityName,emptyDataText, columns, defaultFilter
}: {
  // @ts-ignore
  entityName: string, emptyDataText?: string, defaultFilter, columns: ColumnDef<TData, TValue>[]
}) => {
  const user = typeof window !== 'undefined' ? getUser() : {}
  
  // sorting state of the table
  const [sorting, setSorting] = useState<SortingState>([]);
  // column filters state of the table
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    ...defaultFilter, { id: "assignmentName", value: user ? user.token : "" },
  ]);
  
  const debouncedColumnFilters: ColumnFiltersState = useDebounce(
    columnFilters,
    500
  );
  // pagination state of the table
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, //initial page index
    pageSize: 50, //default page size
  });

  // useEffect(() => {
  //   setColumnFilters([
  //     // { id: "assignmentName", value: session?.user.access_token}
  //   ])
  // }, [])
  const { data: serverData, isLoading } = useGetData({ entityName, pagination, columnFilters: debouncedColumnFilters})

  // if (status === 'loading') {
  //   return <LoadingPage />
  // }

  return (
    <DataTableServerData
      isLoading={isLoading}
      data={serverData}
      // @ts-ignore
      columns={columns}
      pagination={pagination}
      setPagination={setPagination}
      sorting={sorting}
      setSorting={setSorting}
      columnFilters={columnFilters}
      setColumnFilters={setColumnFilters}
      emptyDataText={emptyDataText}
    />
  )
}