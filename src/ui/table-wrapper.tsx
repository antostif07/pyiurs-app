'use client'
import { useState } from 'react';
import { DataTableServerData } from './DataTableServerData';
import { ColumnDef, ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import { useDebounce } from '../lib/useDebounce';
import { useGetData } from '../actions/global';
// import { useSession } from 'next-auth/react';
// import { Session } from 'next-auth';
import LoadingPage from './LoadingPage';

interface ITableWrapper<TData, TValue> {
  entityName: string;
  columns: ColumnDef<TData, TValue>[];
  emptyDataText?: string;
}
export default function TableWrapper<TData, TValue>({entityName, columns, emptyDataText}: ITableWrapper<TData, TValue>) {
  // const {data, status,} = useSession()
  
  // if(status === "loading") {
  //   return (
  //     <LoadingPage />
  //   )
  // }
  
  return <DataTable entityName={entityName} emptyDataText='No data' session={null} columns={columns} />
  // return <div>data</div>
  
}

const DataTable = ({
  session, entityName,emptyDataText, columns
}: {
  // @ts-ignore
  session: Session|null, entityName: string, emptyDataText?: string, columns: ColumnDef<TData, TValue>[]
}) => {
  // sorting state of the table
  const [sorting, setSorting] = useState<SortingState>([]);
  // column filters state of the table
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const debouncedColumnFilters: ColumnFiltersState = useDebounce(
    columnFilters,
    500
  );
  // pagination state of the table
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, //initial page index
    pageSize: 50, //default page size
  });

  const { data: serverData, isLoading } = useGetData({ entityName, pagination, columnFilters: debouncedColumnFilters})

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