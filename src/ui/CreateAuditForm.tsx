'use client'
import createAudit from "@/src/actions/audit"
import { saveMediaObject } from "@/src/actions/mediaObjet"
import { Assignment } from "@/src/common/Assignment"
import FormCalendar from "@/src/components/FormCalendar"
import FormInput from "@/src/components/FormInput"
import FormSelect from "@/src/components/FormSelect"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import dataToFormData from "@/src/lib/dataToFormData"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LoadingButton } from "./LoadingButton"
import { toast } from "@/components/ui/use-toast"
import { usePathname } from "next/navigation"

const FormSchema = z.object({
    name: z.string().min(3, {message: "Veuillez renseigner le nom"}),
    assignment: z.string({message: "Veuillez choisir la boutique"}),
    segment: z.string({message: "Veuillez choisir le Segment"}),
    categories: z.string({message: "Veuillez indiquer la ou les categorie(s) à auditer"}),
    start_date: z.date({message: "Veuillez selectionner la date du debut de l'audit"}),
  })

export default function CreateAuditForm({affectations}: {affectations: Array<Assignment>}) {
    const [excelFile, setExcelFile] = useState<FormData|null>(null)
    const [totalProductsFile, setTotalProductsFile] = useState<FormData|null>(null)
    const [pending, startTransition] = useTransition()
    const pathname = usePathname()
    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
        },
      })
      
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if(!excelFile) {
            toast({
                title: "Fichier non selectionné",
                description: "Veuillez selectionner le fichier excel",
                variant: "destructive"
              })
            
              return
        }

        if(!totalProductsFile) {
            toast({
                title: "Fichier non selectionné",
                description: "Veuillez charger le fichier total des produits",
                variant: "destructive"
              })
            
              return
        }
        
        startTransition(async () => {
            const baseFile = await saveMediaObject(excelFile)
            
            const totalFile = await saveMediaObject(totalProductsFile)
            
            const formData = dataToFormData({...data, totalBaseFile: totalFile['@id'], baseFile: baseFile['@id']})

            await createAudit(formData, {redirectLink: pathname.replace("/add", "")})
        })
    }
// @ts-ignore
    const handleChange = (e: any, setFile) => {
        const fileInput = e.target;

        if (!fileInput.files) {
            console.warn("no file was chosen");
            return;
        }
    
        if (!fileInput.files || fileInput.files.length === 0) {
            console.warn("files list is empty");
            return;
        }
    
        const file = fileInput.files[0];
        
        const formData = new FormData();

        formData.append("file", file);

        setFile(formData)
    }

    return (
        <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-8">
                    <FormInput
                        control={form.control} disabled={pending}
                        name="name" label="Intitulé" placeholder="Intitulé de la Mission"
                    />
                    <FormSelect
                    // @ts-ignore
                        label="Boutique" name="assignment" control={form.control} 
                        options={affectations.map((aff) => ({ id: `/api/assignments/${aff.id}`, value: aff.name}))}
                        placeholder="Selectionner la boutique"  disabled={pending}
                    />
                    <FormSelect
                    // @ts-ignore
                        label="Segment" name="segment" control={form.control} 
                        options={["Femme", "Enfant", "Beauty"].map((aff) => ({ id: aff, value: aff}))}
                        placeholder="Selectionner"  disabled={pending}
                    />
                    <FormInput
                        control={form.control} disabled={pending}
                        name="categories" label="Catégories" placeholder="Séparer les catégories par un virgule"
                    />
                    <FormCalendar
                    // @ts-ignore
                        label="Date de debut" name="start_date" control={form.control} placeholder="Date de debut"
                        disabled={pending}
                    />
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="audit-file">Fichier Excel des produits à auditer</Label>
                        <Input id="audit-file" type="file" onChange={(e) => handleChange(e, setExcelFile)} disabled={pending} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="audit-total-file">Fichier Excel total produits</Label>
                        <Input id="audit-total-file" type="file" onChange={(e) => handleChange(e, setTotalProductsFile)} disabled={pending} />
                    </div>
                </div>
                <LoadingButton pending={pending} text="Créer" />
            </form>
        </Form>
    )
}