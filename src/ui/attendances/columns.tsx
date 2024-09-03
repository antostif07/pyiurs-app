'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Attendance } from "./Attendance"
import { formatApiDateTimeAttendance } from "@/src/lib/formatApiDateTimeAttendance"
import UpdateAttendanceFormDialog from "./update-attendance-form-dialog"
import { Badge } from "@/components/ui/badge"

type Option = {
  label: string;
  value: string;
};

export const columns: ColumnDef<Attendance>[] = [
    {
      accessorKey: "employeeName",
      header: "Nom",
    },
    {
        accessorKey: "attendanceDateTime",
        header: "Date et Heure",
        cell: ({ cell, row }) => {
            return formatApiDateTimeAttendance(row.original.attendanceDateTime)
          }
    },
    {
      accessorKey: "assignmentName",
      header: "Affectation",
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({row: line}) => {
        const row = line.original
        
        return (
          <Badge variant={(row.status === "ABSENT") ? "destructive" : row.status === "PRESENT" ? "outline" : "default"}>
              {row.status}
          </Badge>
        )
      }
    },
    {
      accessorKey: "managerStatus",
      header: "Statut Manager",
      cell:({row: line}) => {
        const row = line.original
        
        return row.managerStatus ? (
          <Badge variant={(row.managerStatus === "ABSENT") ? "destructive" : row.managerStatus === "PRESENT" ? "outline" : "default"}>
              {row.managerStatus}
          </Badge>
        ) : ""
      }
    },
    {
      accessorKey: "observation",
      header: "Observation",
      enableColumnFilter: false,
    },
    {
      accessorKey: "mediaFile",
      header: "P. joint",
      enableColumnFilter: false,
    //   cell: ({row}) => {
    //     const attendance = row.original
    //     const [formData, setFormData] = useState<FormData>()
    //     const [pending, startTransition] = useTransition()

    //     const onImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    //       const fileInput = e.target;
  
    //       if (!fileInput.files) {
    //       console.warn("no file was chosen");
    //       return;
    //       }
  
    //       if (!fileInput.files || fileInput.files.length === 0) {
    //           console.warn("files list is empty");
    //           return;
    //       }
  
    //       const file = fileInput.files[0];
          
    //       const formData = new FormData();
  
    //       formData.append("file", file);
          
    //       setFormData(formData)
    //     }

    //     useEffect(() => {
    //       if(formData) {
    //         startTransition(async () => {
    //           const mediaFile = await saveMediaObject(formData)
              
    //           await updateAttendance({...attendance, mediaFile: mediaFile["@id"]}, attendance.id)
    //         })
    //       }
    //     }, [formData])
    //     return (
    //       <div>
    //         {
    //                 attendance.mediaFile && (
    //                     <Dialog>
    //                         <DialogTrigger asChild>
    //                             <ImageIcon className="text-[#e11380]" />
    //                         </DialogTrigger>
    //                         <DialogContent className="sm:max-w-[425px]">
    //                             <Image src={`${process.env.NEXT_PUBLIC_URL}${attendance.mediaFile.contentUrl}`} alt="file" width={100} height={100} />
    //                         </DialogContent>
    //                     </Dialog>
    //                 )
    //             }
    //             <Label htmlFor={`mediaFile-${attendance.id}`}>
    //                 <DrawingPinFilledIcon  className="" />
    //             </Label>
    //             <input 
    //                 id={`mediaFile-${attendance.id}`} type="file" 
    //                 onChange={onImageFileChange} className="w-1 h-1 opacity-0 absolute" 
    //             />
    //       </div>
    //     )
    //   }
    },
    {
      accessorKey: "rhStatus",
      header: "Statut RH",
    },
    {
        id: "actions",
        cell: ({row}) => {
            const attendance = row.original

            return (
              attendance.status === "PRESENT" ? <p className="text-green-600">Valide</p> :<UpdateAttendanceFormDialog attendance={attendance} />
            )
        }
    }
  ]