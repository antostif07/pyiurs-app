'use client'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import {useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function SelectMonthToVerify() {
    const [selected, setSelected] = useState({
        month: ((new Date()).getMonth() + 1).toString().length == 1 ? `0${((new Date()).getMonth() + 1).toString()}` : ((new Date()).getMonth() + 1).toString(),
        year: (new Date()).getFullYear().toString()
    })
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()
    const handleSelected = (e: any) => {
        setSelected({...selected, ...e})
    }

    useEffect(() => {
        const params = new URLSearchParams(searchParams)

        if (selected.month && selected.year) {
            params.set('search', `${selected.year}-${selected.month}`);
        } else {
            params.delete('search');
        }

        replace(`${pathname}?${params.toString()}`)
    }, [selected])
    const months = [
        { name: "Jan", id: "01"},
        { name: "Fev", id: "02"},
        { name: "Mar", id: "03"},
        { name: "Avr", id: "04"},
        { name: "Mai", id: "05"},
        { name: "Jun", id: "06"},
        { name: "Juil", id: "07"},
        { name: "Aout", id: "08"},
        { name: "Sept", id: "09"},
        { name: "Oct", id: "10"},
        { name: "Nov", id: "11"},
        { name: "Dec", id: "12"},
    ]

    return (
        <div className="flex gap-3">
            <Select
                onValueChange={(value) => handleSelected({month: value})}
                value={selected.month}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Le Mois" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Affectation</SelectLabel>
                        {
                            months.map((month: {name: string, id: string}) => (
                                <SelectItem value={month.id} key={month.id}>{month.name}</SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select
                onValueChange={(e: string) => handleSelected({year: e})}
                value={selected.year}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="L'Année" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Affectation</SelectLabel>
                        {
                            Array.from({length: (new Date()).getFullYear() - 2022}, (_,k) => 2022+1+k).map((year: number) => (
                                <SelectItem value={year.toString()} key={year}>{year}</SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}