import { Input } from "@/components/ui/input";

export default function HeaderTable ({table, columns}: {table: any, columns: {search_column: string, placeholder?: string}[]}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {
                columns.map((col, index) => (
                    <Input
                        key={`${col.search_column}-${index}`}
                        placeholder={col.placeholder}
                        value={(table.getColumn(col.search_column)?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn(col.search_column)?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                ))
            }
        </div>
    )
}