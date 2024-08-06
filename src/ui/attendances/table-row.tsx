'use client '
import { TableCell, TableRow as Row } from "@/components/ui/table";
import { Attendance } from "@/src/common/Attendance";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";
import { DrawingPinFilledIcon, ImageIcon, ReloadIcon, CheckIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState, useTransition } from "react";
import { updateAttendance } from "@/src/actions/attendances";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

interface IRow {
    attendance: Attendance
}

export default function TableRow({attendance}: IRow) {
    const [pending, startTransition] = useTransition()
    const [formAttendance, setFormAttendance] = useState<any>({})

    const handleForm = async () => {
        startTransition(async () => {
            await updateAttendance(formAttendance, attendance.id)  
        })
    }

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
        
        setFormAttendance({...formAttendance, mediaFile: formData})
    }
    
    return (
        <Row>
            <TableCell className="font-medium whitespace-nowrap">{attendance.employee.name}</TableCell>
            <TableCell className="font-medium whitespace-nowrap">{format(attendance.attendanceDateTime.split("+")[0], "dd-MMM-yyyy HH:mm")}</TableCell>
            <TableCell className="font-medium">{attendance.status}</TableCell>
            <TableCell className="font-semibold">
            { 
                attendance.manager_status ?? <Select 
                onValueChange={async (d) => {
                    setFormAttendance({...formAttendance, manager_status: d})
                }} disabled={pending}
                defaultValue={attendance.status === "PRESENT" ? attendance.status : attendance.manager_status}
            >
                <SelectTrigger>
                    <SelectValue placeholder={"Statut Manager"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Employé Système</SelectLabel>
                        {
                            [
                                "PRESENT", "Retard", "ABSENT", "MALADE", "CONGE CIRC", "CONGE CIRC NP", "SUSPENSION"
                            ].map((option, index) => (
                                <SelectItem value={option} key={index}>
                                    {option}
                                </SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
            }
            </TableCell>
            <TableCell className="italic">
                {
                    attendance.observation ?? <Input value={attendance.observation} onChange={(e) => setFormAttendance({...formAttendance, observation: e.target.value})} />
                }
            </TableCell>
            <TableCell className="flex justify-center whitespace-nowrap">
                {
                    attendance.mediaFile && (
                        <Dialog>
                            <DialogTrigger asChild>
                                <ImageIcon className="text-[#e11380]" />
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <Image src={`${process.env.NEXT_PUBLIC_URL}${attendance.mediaFile.contentUrl}`} alt="file" width={100} />
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
            </TableCell>
            <TableCell>
            { 
                attendance.rh_status ?? <Select 
                    onValueChange={async (d) => {
                        setFormAttendance({...formAttendance, rh_status: d, is_valid: true})
                    }}
                    defaultValue={attendance.status === "PRESENT" ? attendance.status : attendance.rh_status}
                >
                    <SelectTrigger  disabled={attendance.status === "PRESENT"}>
                        <SelectValue className="font-bold" placeholder={"Statut RH"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Employé Système</SelectLabel>
                            {
                                [
                                    "PRESENT", "Retard", "ABSENT", "MALADE", "CONGE CIRC", "CONGE CIRC NP", "SUSPENSION"
                                ].map((option, index) => (
                                    <SelectItem value={option} key={index}>
                                        {option}
                                    </SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            }
            </TableCell>
            <TableCell className="flex gap-4">
                {
                    attendance.is_valid ? (
                        <p>Validé</p>
                    ) : (
                        <>
                            {
                                attendance.manager_status ? (
                                    <div className="flex items-center">
                                        <CheckIcon className="h-4 w-4" />Confirmé
                                    </div>
                                ) : (
                                    <Button className="" onClick={() => handleForm()} disabled={pending}>
                                        {pending && <ReloadIcon className="animate-spin h-4 w-4 mr-2" />}
                                        Confirmer
                                    </Button>
                                )
                            }
                            <Button className="bg-[#e11380]" onClick={() => handleForm()} disabled={pending}>
                                {pending && <ReloadIcon className="animate-spin h-4 w-4 mr-2" />}
                                Valider
                            </Button>
                        </>
                    )
                }
            </TableCell>
        </Row>
    )
}