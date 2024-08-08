'use client'

import { Button } from "@/components/ui/button"
import { PaginationState } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Pagination({table, pagination,}: {table: any, pagination: PaginationState}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace, push } = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set('page', (pagination.pageIndex+1).toString());
        
        push(`${pathname}?${params.toString()}`);
    }, [pagination])

    return (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    )
}