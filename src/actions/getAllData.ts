'use server'

import { ColumnFiltersState, PaginationState } from "@tanstack/react-table";

const getAllData = async ({ 
    // sorting, 
    columnFilters, 
    pagination, entityName, token }: {entityName: string, pagination: PaginationState, columnFilters: ColumnFiltersState, token?: string}) => {
    // set Pagination
    const page = pagination.pageIndex + 1
    
    // create Params for api query
    const searchParams = () => {
        const p = new URLSearchParams()

        p.append("page", (page).toString())

        // set Filters
        columnFilters.forEach((element: any) => {
            const searchEl = element.id.replaceAll("_", ".")

            p.append(searchEl, element.value)
        });
        
        return p.toString()
    }
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${entityName}?${searchParams()}`, {
        headers: {
          "content-type": "application/ld+json",
          "Authorization": `Bearer ${token}`
        },
    })
    
    const resp = await res.json()

    return resp
}