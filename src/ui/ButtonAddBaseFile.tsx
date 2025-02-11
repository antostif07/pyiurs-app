'use client'
import { updateAudit } from "@/src/actions/audit"
import { saveMediaObject } from "@/src/actions/mediaObjet"
import { Audit } from "@/src/common/Audit"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTransition } from "react"
import { usePathname } from "next/navigation"
import {toast} from "@/components/ui/use-toast";

export default function ButtonAddBaseFile ({audit}: {audit: Audit}) {
    const pathname = usePathname()
    const [pending, startTransition] = useTransition()

    const handleChange = (e: any) => {
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

        startTransition(async () => {
            const fileResult = await saveMediaObject(formData)

            // @ts-ignore
            const result = await updateAudit({baseFile: fileResult["@id"]}, audit.id, {redirectLink: pathname})

            if (result.baseFile) {
                toast({
                    title: "Fichier de base ajouté",
                    description: `Fichier de base ajouté avec succés`,
                })
            }
        })
    }

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
            <Label htmlFor="audit-result-file">
                {
                audit.baseFile ? "Modifier le fichier de base de l'audit" : "Ajouter le fichier de base de l'audit"
                }
            </Label>
            <Input id="audit-result-file" type="file" onChange={handleChange} disabled={pending} />
        </div>
    )
}