import { useQuery } from "@tanstack/react-query"
import { ColumnFiltersState, PaginationState } from "@tanstack/react-table"
import { redirect } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { revalidatePath } from "next/cache"

const getAllData = async ({ 
    // sorting, 
    columnFilters, 
    pagination, entityName, token }: {entityName: string, pagination: PaginationState, columnFilters: ColumnFiltersState, token?: string}) => {
    // set Pagination
    const page = pagination.pageIndex + 1
    
    // create Params for pages query
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
        cache: 'no-cache'
    })
    
    const resp = await res.json()

    if(resp && resp.code === 401) {

        toast({
            description: "Session expiré"
        })

        redirect('/login')
    }

    return resp
}

export const useGetData = ({entityName, pagination, columnFilters = []}: {entityName: string, pagination: PaginationState, columnFilters: ColumnFiltersState}) => {
    const {data, isLoading} = useQuery({
        queryKey: [entityName, pagination, columnFilters],
        queryFn: () => {
            
            return getAllData({
                entityName, pagination, columnFilters,
            })
        }
    })

    return { data, isLoading}
}