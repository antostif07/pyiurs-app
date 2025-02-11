'use client'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/src/components/FormInput";
import dataToFormData from "@/src/lib/dataToFormData";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, PlusCircleIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Employee } from "./Employee";
import FormSelect from "@/src/components/FormSelect";
import addEmployeePrime from "@/src/actions/employeePrime";

const FormSchema = z.object({
    description: z.string().min(3, {message: "Veuillez renseigner le motif"}),
    amount: z.string().refine((value) => value !== null && value !== undefined, {
        message: "Veuillez indiquer le montant de la prime"
      }),
    month: z.string(),
    employee: z.string(),
  })

export default function PrimeDialog({employee}: {employee: Employee}) {
    const [open, setOpen] = useState<boolean>(false)
    const [pending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            employee: employee['@id']
        },
      })
      
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const formData = dataToFormData(data)
        
        startTransition(async () => {
            await addEmployeePrime(formData)
            setOpen(false)
        })
    }
    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger asChild onClick={() => setOpen(true)}>
                <Button>
                    <PlusCircleIcon className="mr-2" /> Ajouter une prime
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Ajouter une prime</AlertDialogTitle>
                    <AlertDialogDescription>Ajouter le montant de la prime de l'employé</AlertDialogDescription>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="my-4 grid grid-cols-2 gap-4">
                                <FormInput
                                    control={form.control} disabled={pending}
                                    name="description" label="Motif" placeholder="Motif de la prime"
                                />
                                <FormInput
                                    control={form.control} disabled={pending}
                                    name="amount" label="Montant" placeholder="Montant" type="number"
                                />
                                <FormSelect name="month" options={[
                                    {id: "2024-01", value: "Janvier 2024"},
                                    {id: "2024-02", value: "Février 2024"},
                                    {id: "2024-03", value: "Mars 2024"},
                                    {id: "2024-04", value: "Avril 2024"},
                                    {id: "2024-05", value: "Mai 2024"},
                                    {id: "2024-06", value: "Juin 2024"},
                                    {id: "2024-07", value: "Juillet 2024"},
                                    {id: "2024-08", value: "Aout 2024"},
                                    {id: "2024-09", value: "Septembre 2024"},
                                    {id: "2024-10", value: "Octobre 2024"},
                                    {id: "2024-11", value: "Novembre 2024"},
                                    {id: "2024-12", value: "Decembre 2024"},
                                ]} label={"Mois de paiement de la prime"} disabled={pending} />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button disabled={pending} variant={'outline'} onClick={() => setOpen(false)}>Annuler</Button>
                                <Button type="submit" disabled={pending}>{ pending ? <LoaderIcon className="w-3 h-3 animate-spin" /> : "Ajouter"}</Button>
                            </div>
                        </form>
                    </Form>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}