'use client'

import {
    Label,
} from "react-aria-components";
import {Input} from "@/components/ui/input";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";
import {Assignment} from "@/src/common/Assignment";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

export default function AttendanceFilters({assignments, userRoles}: {assignments: Assignment[], userRoles: string[]}) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)

        if (term) {
            params.set('attendanceDateTime', term);
        } else {
            params.delete('attendanceDateTime');
        }

        replace(`${pathname}?${params.toString()}`)
    }, 300)

    const handleAssignment = (assignmentName: string) => {
        const params = new URLSearchParams(searchParams)

        if (assignmentName) {
            params.set('assignmentName', assignmentName);
        } else {
            params.delete('assignmentName');
        }

        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className={'flex pb-4 gap-4'}>
            <div>
                <Label>Filtrer le mois</Label>
                <Input
                    placeholder={'Ex: 2024-02 pour Fevrier'}
                    onChange={(event) => {
                        handleSearch(event.target.value)
                    }}
                    defaultValue={searchParams.get('attendanceDateTime')?.toString()}
                />
            </div>
            {
                userRoles.includes("ROLE_ADMIN") && <div>
                    <Label>Filtrer par boutique</Label>
                    <Select onValueChange={(value) => handleAssignment(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Selectionner la boutique" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Boutique</SelectLabel>
                                {
                                    assignments.map((ass, index) => (
                                        <SelectItem value={ass.name} key={index}>{ass.name}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            }
        </div>
    )
}