/* eslint-disable @next/next/no-img-element */
'use client'
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { Attendance } from "./Attendance";
import { saveMediaObject } from "@/src/actions/mediaObjet";
import { updateAttendance } from "@/src/actions/attendances";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { DrawingPinFilledIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";

export default function UpdateAttendanceFile({attendance}: {attendance: Attendance}) {
    const [formData, setFormData] = useState<FormData>()
    const [pending, startTransition] = useTransition()

    const onImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        
        setFormData(formData)
    }

    useEffect(() => {
        if(formData) {
        startTransition(async () => {
          const mediaFile = await saveMediaObject(formData)
        //@ts-ignore
          const att = await updateAttendance({mediaFile: mediaFile["@id"]}, attendance.id)
        })
      }
    }, [formData])
    
    return (
      <div>
        {
                attendance.mediaFile && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <ImageIcon className="text-[#e11380]" />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            {/* // eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`${process.env.NEXT_PUBLIC_URL}${attendance.mediaFile.contentUrl}`} alt="file" width={100} height={100} />
                        </DialogContent>
                    </Dialog>
                )
            }
            <Label htmlFor={`mediaFile-${attendance.id}`}>
                <DrawingPinFilledIcon  className="" />
            </Label>
            <input 
                id={`mediaFile-${attendance.id}`} type="file" 
                onChange={onImageFileChange} className="w-1 h-1 opacity-0 absolute" 
            />
      </div>
    )
}