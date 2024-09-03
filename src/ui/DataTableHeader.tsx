import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { flexRender, Table } from "@tanstack/react-table";

export default function DataTableHeader<TData>({table}: {table: Table<TData>}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            {table.getHeaderGroups()[0].headers.map(
          (header) =>
            !header.isPlaceholder &&
            header.column.getCanFilter() && (
              <div key={header.id} className="">
                <Label className="block font-semibold text-sm">
                  {`${flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}`}
                  :
                </Label>
                <Input
                  className="w-full"
                  placeholder={`Filtrer ${flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )} ...`}
                  value={(header.column.getFilterValue() as string) || ""}
                  onChange={(e) => {
                    header.column?.setFilterValue(e.target.value);
                  }}
                />
              </div>
            )
        )}
        </div>
    )
}