'use client'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SelectMonthToVerify({handleSelected, selected}: {handleSelected: (e:any) => void, selected: {month: string, year:string}}) {
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
            <Select onValueChange={(e: string) => handleSelected({month: e})} value={selected.month}>
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
            <Select onValueChange={(e: string) => handleSelected({year: selected.year})} value={selected.year}>
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