'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Attendance } from "./Attendance";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useTransition } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateAttendance } from "@/src/actions/attendances";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function UpdateAttendanceFormDialog({attendance}: {attendance: Attendance}) {
    const [form, setForm] = useState<{managerStatus?: string, observation?: string, rhStatus?: string}|{}>({})
    const [pending, startTransition] = useTransition()
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter()

    useEffect(() => {
        setForm({
            ...form,
            managerStatus: attendance.managerStatus, 
            observation: attendance.observation,
            rhStatus: attendance.rhStatus,
        })
    }, [attendance])
    
    const handleForm = () => {
        const params = new URLSearchParams(searchParams);
        const url = `${pathname}?${params.toString()}`
        
        startTransition(async () => {
            // @ts-ignore
            await updateAttendance(form, attendance.id ,{redirectLink: url})
            replace(url, {scroll: true});
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button>Confirmer</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Confirmer les statuts? {attendance.observation}</AlertDialogTitle>
                <AlertDialogDescription>
                    <div className="w-full grid grid-cols-2 gap-2">
                        {/* @ts-ignore */}
                        <Select onValueChange={(e) => setForm({...form, managerStatus: e})} defaultValue={form.managerStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder={"Statut Manager"} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Statut</SelectLabel>
                                    {
                                        [
                                            "PRESENT", "REPOS", "RETARD", "ABSENT", "MALADE", "CONGE CIRC", "CONGE CIRC NP", "SUSPENSION"
                                        ].map((option, index) => (
                                            <SelectItem value={option} key={index}>
                                                {option}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Input 
                        // @ts-ignore
                            value={form.observation} placeholder="Observation"
                            onChange={(e) => setForm({...form, observation: e.target.value})}
                            
                        />
                        {/* @ts-ignore */}
                        <Select onValueChange={(e) => setForm({...form, rhStatus: e})} defaultValue={form.rhStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder={"Statut RH"} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Statut</SelectLabel>
                                    {
                                        [
                                            "PRESENT", "REPOS", "RETARD", "ABSENT", "MALADE", "CONGE CIRC", "CONGE CIRC NP", "SUSPENSION"
                                        ].map((option, index) => (
                                            <SelectItem value={option} key={index}>
                                                {option}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel disabled={pending}>Annuler</AlertDialogCancel>
                <AlertDialogAction disabled={pending} className="flex gap-1 items-center" onClick={handleForm}>Confirmer { pending && <ReloadIcon className="animate-spin w-3 r-3" />}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}