'use client'
import dayjs from "dayjs"
import localeData from 'dayjs/plugin/localeData'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField } from "@/components/ui/form"
// import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import FormSelect from "@/src/components/FormSelect"

const formSchema = z.object({
    year: z.string(),
    month: z.string(),
})

export default function MonthFilter() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    dayjs.extend(localeData)
    
    // const { toast } = useToast()
    const months = dayjs.months().map((month, index) => ({value: month, id: (index + 1).toString() }))
    const years: {value: string, id: any}[] = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028].map(year => ({value: year.toString(), id: year.toString() }))

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            month: dayjs().month().toString(), 
            year: dayjs().year().toString()
        },
      })
    
      function onSubmit(data: z.infer<typeof formSchema>) {
        const params = new URLSearchParams(searchParams);

        if(data && data.month === '1') {
            const after = `${parseInt(data.year) - 1}-12-21`
            const before = `${data.year}-${data.month}-20`
            params.set('attendanceDateTime[after]', after);
            params.set('attendanceDateTime[before]', before)

            replace(`${pathname}?${params.toString()}`);
        } else if(data) {
            const after = `${data.year}-${parseInt(data.month) - 1}-21`
            const before = `${data.year}-${data.month}-20`
            params.set('attendanceDateTime[after]', after);
            params.set('attendanceDateTime[before]', before)

            replace(`${pathname}?${params.toString()}`);
        }
        
        // toast({
        //   title: "You submitted the following values:",
        //   description: (
        //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //     </pre>
        //   ),
        // })
      }

      // @ts-ignore
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 items-end justify-end">
                
                <FormSelect
                // @ts-ignore
                    name="month" options={months} placeholder="Selectionner le Mois" label="Mois" form={form}
                />
                <FormSelect
                // @ts-ignore
                    name="year" options={years} placeholder="Selectionner l'Année" label="Année" form={form}               
                />
                <Button type="submit" className="cursor-pointer">Filtrer</Button>
            </form>
        </Form>
    )
}