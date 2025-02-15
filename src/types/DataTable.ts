import {
    ColumnDef,
    ColumnFiltersState,
    PaginationState,
    SortingState,
  } from "@tanstack/react-table";
  import { Dispatch, SetStateAction } from "react";
  
  export interface IDataTableProps<TData, TValue> {
    isTableDataLoading: boolean;
    data?: any; // UseGetTableResponseType<TData>;
    columns: ColumnDef<TData, TValue>[];
    pagination?: PaginationState;
    setPagination?: Dispatch<SetStateAction<PaginationState>>;
    sorting?: SortingState;
    setSorting?: Dispatch<SetStateAction<SortingState>>;
    columnFilters?: ColumnFiltersState;
    setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  }
  
  export interface UseGetTableResponseType<TData> {
    limit: number;
    page: number;
    total: number;
    total_filtered: number;
    data: TData[];
  }