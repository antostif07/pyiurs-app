'use client'

import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { CaretSortIcon, DrawingPinFilledIcon, ImageIcon, ReloadIcon } from "@radix-ui/react-icons"
import { Attendance } from "./Attendance"
import { ChangeEvent, useEffect, useState, useTransition } from "react"
import { updateAttendance } from "@/src/actions/attendances"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Image from 'next/image'
import { Label } from "@/components/ui/label"
import { saveMediaObject } from "@/src/actions/mediaObjet"
import { Input } from "@/components/ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { formatApiDateTimeAttendance } from "@/src/lib/formatApiDateTimeAttendance"

// const StatutMangerCell = ({row}: {row:any}) => {
//   const attendance = row.original
//   const pathname = usePathname()
//   const searchParams = useSearchParams()
//   const url = `${pathname}?${searchParams}`
//   const router = useRouter()
  
//   const [fetching, setFetching] = useState(false)
//   const [pending, startTransition] = useTransition()

//   const loading = fetching // || pending
  
//   async function handleChange(value: string) {
//     console.log(value);
    
//     setFetching(true)
//     // @ts-ignore
//     await updateAttendance({manager_status: value}, attendance.id, {redirectLink: url})
//     console.log('finish');
//     // router.replace(url, {scroll: true})
//     startTransition(router.refresh)
//     // router.push(url, {scroll: true})
//     setFetching(false)
//   }
//   return (
//     <div>
//       { 
//           attendance.manager_status ?? (
          //   <Select 
          //     onValueChange={async (d) => await handleChange(d)} disabled={attendance.status === "PRESENT"}
          //     defaultValue={attendance.status === "PRESENT" ? attendance.status : attendance.manager_status}>
          //     <SelectTrigger>
          //         <SelectValue placeholder={"Statut Manager"} />
          //     </SelectTrigger>
          //     <SelectContent>
          //         <SelectGroup>
          //             <SelectLabel>Statut</SelectLabel>
          //             {
          //                 [
          //                     "PRESENT", "REPOS", "RETARD", "ABSENT", "MALADE", "CONGE CIRC", "CONGE CIRC NP", "SUSPENSION"
          //                 ].map((option, index) => (
          //                     <SelectItem value={option} key={index}>
          //                         <div className="flex gap-2 items-center">{option} {loading && <ReloadIcon className="w-3 h-3 animate-spin" />}</div>
          //                     </SelectItem>
          //                 ))
          //             }
          //         </SelectGroup>
          //     </SelectContent>
          // </Select>
//           )
//       }
//     </div>
//   )
// }

type Option = {
  label: string;
  value: string;
};

// @ts-ignore
const TableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue()
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState("")
  const [pending, startTransition] = useTransition()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const url = `${pathname}?${searchParams}`

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const onBlur = () => {
    startTransition(async () => {
      const obj = {}
      //@ts-ignore
      obj[column.columnDef.accessorKey] = value
      //@ts-ignore
      await updateAttendance(obj, row.original.id)
    })
    table.options.meta?.updateData(row.index, column.id, value, url)
  }

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };
  
  const test_status = (column.columnDef.accessorKey === "manager_status" || column.columnDef.accessorKey === "rh_statut") && row.original.status === "PRESENT"
  
  return test_status ? row.original.status : columnMeta?.type === "select" ? (
    <Select 
      // @ts-ignore
      onValueChange={onSelectChange} 
      defaultValue={test_status ? row.original.status: initialValue}>
      <SelectTrigger>
          <SelectValue placeholder={column.columnDef.header} />
      </SelectTrigger>
      <SelectContent>
          <SelectGroup>
              <SelectLabel>Statut</SelectLabel>
              {
                  // [
                  //     "PRESENT", "REPOS", "RETARD", "ABSENT", "MALADE", "CONGE CIRC", "CONGE CIRC NP", "SUSPENSION"
                  // ]
                  columnMeta?.options?.map((option: Option) => (
                      <SelectItem value={option.value} key={option.value}>
                          {/*<div className="flex gap-2 items-center">  {loading && <ReloadIcon className="w-3 h-3 animate-spin" />}</div> */}
                          {option.label}
                      </SelectItem>
                  ))
              }
            </SelectGroup>
          </SelectContent>
    </Select>
  ) : <Input 
    value={value} 
    onChange={e => setValue(e.target.value)} 
    onBlur={onBlur} disabled={pending}
    type={column.columnDef.meta?.type || "text"}
  />
}
export const columns: ColumnDef<Attendance>[] = [
    {
      accessorKey: "employee.name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nom
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
        accessorKey: "attendanceDateTime",
        header: "Date et Heure",
        cell: ({ cell, row }) => {
            return formatApiDateTimeAttendance(row.original.attendanceDateTime)
          }
    },
    {
      accessorKey: "employee.assignment.name",
      header: "Affectation",
    },
    {
      accessorKey: "status",
      header: "Statut",
    },
    {
      accessorKey: "manager_status",
      header: "Statut Manager",
      cell: TableCell,
      meta: { type: "select", options: [
        { value: "PRESENT", label: "PRESENT" },
        { value: "REPOS", label: "REPOS" },
        { value: "RETARD", label: "RETARD" },
        { value: "ABSENT", label: "ABSENT" },
        { value: "CONGE CIRC", label: "CONGE CIRC" },
        { value: "CONGE CIRC NP", label: "CONGE CIRC NP" },
        { value: "SUSPENSION", label: "SUSPENSION" },
      ],},
    },
    {
      accessorKey: "observation",
      header: "Observation",
      cell: TableCell,
      meta: { type: "text", },
    },
    // {
    //   accessorKey: "mediaFile",
    //   header: "P. joint",
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
    // },
    {
      accessorKey: "rh_statut",
      header: "Statut RH",
      cell: TableCell,
      meta: { type: "select", options: [
        { value: "PRESENT", label: "PRESENT" },
        { value: "REPOS", label: "REPOS" },
        { value: "RETARD", label: "RETARD" },
        { value: "ABSENT", label: "ABSENT" },
        { value: "CONGE CIRC", label: "CONGE CIRC" },
        { value: "CONGE CIRC NP", label: "CONGE CIRC NP" },
        { value: "SUSPENSION", label: "SUSPENSION" },
      ],},
    },
    {
        id: "actions",
        // cell: ({row}) => {
        //     const attendance = row.original
        //     const [pending, startTransition] = useTransition()

        //     const handleForm = async () => {
        //       startTransition(async () => {
        //           await updateAttendance({...attendance, isValid: true}, attendance.id)
        //       })
        //     }
        //     return (
        //       <Button className="bg-[#e11380]" onClick={() => handleForm()} disabled={pending}>
        //         {pending && <ReloadIcon className="animate-spin h-4 w-4 mr-2" />}
        //         Valider
        //       </Button>
        //       )
        // }
    }
  ]