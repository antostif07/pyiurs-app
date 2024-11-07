'use client'
import { Assignment } from "@/src/common/Assignment";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SelectAssignment({affectations}: {affectations: Assignment[]}) { 
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(affectation?: string) {
        const params = new URLSearchParams(searchParams);
        if (affectation) {
          params.set('assignment', affectation)
        } else {
          params.delete('assignment')
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <Select
            onValueChange={(e: string) => handleSearch(e)}
            value={searchParams?.get('assignment') || undefined}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selectionner l'Affectation" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Affectation</SelectLabel>
                    {
                        affectations.map((aff) => (
                            <SelectItem value={aff.id.toString()} key={aff.id}>{aff.name}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}