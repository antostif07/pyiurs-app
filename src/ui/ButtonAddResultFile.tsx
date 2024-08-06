'use client'
import { updateAudit } from "@/src/actions/audit"
import { saveMediaObject } from "@/src/actions/mediaObjet"
import { Audit } from "@/src/common/Audit"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTransition } from "react"

export default function ButtonAddResultFile ({audit}: {audit: Audit}) {
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
            await updateAudit({resultFile: fileResult["@id"]}, audit.id)
        })
    }

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="audit-result-file">Ajouter un fichier Excel du Résultat</Label>
            <Input id="audit-result-file" type="file" onChange={handleChange} disabled={pending} />
        </div>
    )
}