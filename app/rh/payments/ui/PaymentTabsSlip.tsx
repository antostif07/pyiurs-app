'use client'
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import getUser from "@/src/lib/getUser";
import { IEmployeePayment } from "@/src/types/IEmployeePayment";
import BulletinPaie from "@/src/ui/attendances/BulletinPaie";
import PyiursLogo from "@/src/ui/PyiursLogo";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function PaymentTabsSlip({data}: {data: IEmployeePayment[]}) {
    const handlePrint = (userPayment: IEmployeePayment) => {
        return BulletinPaie({employeePayment: userPayment})
    }
    
    const user = getUser()
    
    const result = data ? data.filter(d => d.employee.assignment.name === user.token) : []

    return (
        <Tabs className="mt-4" defaultValue={data[0] ? data[0].employee.name : ""}>
            <TabsList>
                {
                    result && result.map((userPayment: IEmployeePayment, index: number) => (
                        <TabsTrigger key={index} value={userPayment.employee.name}>{userPayment.employee.name}</TabsTrigger>
                    ))
                }
            </TabsList>
            {
                result && result.map((userPayment: IEmployeePayment, index: number) => {
                    const transportByDay = userPayment.employee.transportFee / 26
                    const totalNet = (userPayment.employee.total_days - userPayment.absence) * (userPayment.employee.salary / userPayment.employee.total_days)
                    const totalRet = 
                        userPayment.transportAbs + userPayment.transportCCirc + userPayment.transportCCircNP + 
                        userPayment.transportMalade + userPayment.transportSuspension +
                        (userPayment.totalPaidDebts ?? 0) + userPayment.retCCirc + userPayment.retCCircNP + 
                        userPayment.retMalade + userPayment.retSuspension + userPayment.retRetR1 + userPayment.retRetR2

                    return (
                        <TabsContent key={index} value={userPayment.employee.name}>
                            {
                                <div>
                                    <div className="my-4">
                                        <Button onClick={() => handlePrint(userPayment)}>Imprimer le bulletin</Button>
                                    </div>
                                    <div className="w-full min-h-48 bg-gray-200 p-4 flex justify-center items-center">
                                        <div className="bg-white w-[1050px] h-[1485px] p-10">
                                            <div className="flex justify-between items-center w-full bg-red">
                                                <PyiursLogo />
                                                <div className="font-bold text-2xl">Pyiurs Entreprises</div>
                                            </div>
                                            <div className="text-center">
                                                Av. Colonel Mpia, 37A - Kinshasa/Ngaliema - Id.Nat. 01-G4701-N39612B - RCCM: CD/KNG/RCCM/18-A-04301
                                            </div>
                                            <div className="h-[2px] w-full bg-pink-400" />
                                            <div className="mt-8 flex flex-col items-center">
                                                <span className="font-bold text-3xl text-pink-500">BULLETIN DE PAIE</span>
                                                <span className="font-bold text-pink-500">Periode: {format(`${userPayment.month}-01`, "MMMM yyyy", {locale: fr})}</span>
                                            </div>
                                            <div className="grid grid-cols-2 mt-6">
                                                <div>
                                                    <div className="grid grid-cols-2">
                                                        <div className="flex flex-col">
                                                            <span>Nom</span>
                                                            <span>Salaire de base</span>
                                                            <span>Transport</span>
                                                            <span>Salaire sur</span>
                                                            <span className="mt-3">Affectation</span>
                                                            <span>Email</span>
                                                            <span>Date de debut</span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold">: {userPayment.employee.name}</span>
                                                            <span className="font-bold">: {userPayment.employee.salary} $</span>
                                                            <span className="font-bold">: {userPayment.employee.transportFee} $</span>
                                                            <span className="font-bold">: {userPayment.employee.total_days} Jr</span>
                                                            <span className="font-bold mt-3">: {userPayment.employee.assignment.name}</span>
                                                            <span className="font-bold">: {userPayment.employee.email}</span>
                                                            <span className="font-bold">: {userPayment.employee.start_date ? format(userPayment.employee.start_date, "dd MMMM yyyy", {locale: fr}) : ""}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                <div className="grid grid-cols-2">
                                                        <div className="flex flex-col">
                                                            <span>Tel</span>
                                                            <span>Matricule</span>
                                                            <span>Fonction</span>
                                                            <span>Departement</span>
                                                            <span className="mt-3">Status</span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold">: {userPayment.employee.tel}</span>
                                                            <span className="font-bold">: {userPayment.employee.matricule}</span>
                                                            <span className="font-bold">: {userPayment.employee.employee_function}</span>
                                                            <span className="font-bold">: {userPayment.employee.department}</span>
                                                            <span className="font-bold mt-3">: {userPayment.employee.job_status}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Table className="mt-3">
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="text-center">Statut</TableHead>
                                                        <TableHead className="text-center">#</TableHead>
                                                        <TableHead className="text-center">Libellé</TableHead>
                                                        <TableHead className="text-center">Gains</TableHead>
                                                        <TableHead className="text-center">Retenues</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody className="text-xs">
                                                    <TableRow>
                                                        <TableCell className="border">Présences</TableCell>
                                                        <TableCell className="w-[200px] text-center border">{26 - userPayment.absence}</TableCell>
                                                        <TableCell className="border">{`Salaire Mensuel de ${26 - userPayment.absence} jours prestés`}</TableCell>
                                                        <TableCell className="border">+ {((26 - userPayment.absence) * (userPayment.employee.salary / userPayment.employee.total_days)).toFixed(2)}$</TableCell>
                                                        <TableCell className="border"></TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="border">Absences</TableCell>
                                                        <TableCell className=" text-center border">{userPayment.absence}</TableCell>
                                                        <TableCell className="border bg-slate-300"></TableCell>
                                                        <TableCell className="border bg-slate-300"></TableCell>
                                                        <TableCell className="border text-right bg-slate-300 font-bold">- {(userPayment.absence * (userPayment.employee.salary / userPayment.employee.total_days)).toFixed(2)}$</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="border">Malade</TableCell>
                                                        <TableCell className=" text-center border"></TableCell>
                                                        <TableCell className="border"></TableCell>
                                                        <TableCell className="border"></TableCell>
                                                        <TableCell className="border text-right">- $</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="border">Sanction</TableCell>
                                                        <TableCell className=" text-center border"></TableCell>
                                                        <TableCell className="border"></TableCell>
                                                        <TableCell className="border"></TableCell>
                                                        <TableCell className="border text-right">- $</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="border">Congé CC</TableCell>
                                                        <TableCell className=" text-center border"></TableCell>
                                                        <TableCell className="border"></TableCell>
                                                        <TableCell className="border"></TableCell>
                                                        <TableCell className="border text-right">- $</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="border">Congé CC Non Payé</TableCell>
                                                        <TableCell className=" text-center border"></TableCell>
                                                        <TableCell className="border"></TableCell>
                                                        <TableCell className="border"></TableCell>
                                                        <TableCell className="border text-right">- $</TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className="border-0" colSpan={2}></TableCell>
                                                        <TableCell className="border">Ret. Dettes</TableCell>
                                                        <TableCell className="border"></TableCell>
                                                        <TableCell className="border text-right">-{userPayment.totalPaidDebts ?? 0} $</TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className=""></TableCell>
                                                        <TableCell className=""></TableCell>
                                                        <TableCell className="border">Retenue Retard-1 ({userPayment.retR1} jrs)</TableCell>
                                                        <TableCell className="border"></TableCell>
                                                        <TableCell className="border text-right">- {userPayment.retRetR1} $</TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className="" colSpan={2}></TableCell>
                                                        <TableCell className="border">Retenue Retard-2 ({userPayment.retR2} jrs)</TableCell>
                                                        <TableCell className="border"></TableCell>
                                                        <TableCell className="border text-right">-{userPayment.retRetR2} $</TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className="" colSpan={2}></TableCell>
                                                        <TableCell className="border">Retenue transport pr absence ({userPayment.absence} jrs)</TableCell>
                                                        <TableCell className="border"></TableCell>
                                                        <TableCell className="border text-right">- {userPayment.transportAbs} $</TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className=""></TableCell>
                                                        <TableCell className=""></TableCell>
                                                        <TableCell className="border">Retenue transport pr malade ({userPayment.malade} jrs)</TableCell>
                                                        <TableCell className="border"></TableCell>
                                                        <TableCell className="border text-right">- {userPayment.transportMalade} $</TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className="" colSpan={2}></TableCell>
                                                        <TableCell className="border">Retenue transport pr Congé Circ. ({userPayment.cCirc} jrs)</TableCell>
                                                        <TableCell className="border"></TableCell>
                                                        <TableCell className="border text-right">-{userPayment.transportCCirc} $</TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className="" colSpan={2}></TableCell>
                                                        <TableCell className="border">Retenue transport pr Congé Circ. Non Payé ({userPayment.cCircNP} jrs)</TableCell>
                                                        <TableCell className="border"></TableCell>
                                                        <TableCell className="border text-right">- {userPayment.transportCCircNP} $</TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className="" colSpan={2}></TableCell>
                                                        <TableCell className="border">Retenue transport pr le jr de suspension ({userPayment.suspension} jrs) </TableCell>
                                                        <TableCell className="border"></TableCell>
                                                        <TableCell className="border text-right">- {userPayment.transportSuspension} $</TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className="" colSpan={2}></TableCell>
                                                        <TableCell className="border h-4 bg-slate-300" colSpan={3}></TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className=""></TableCell>
                                                        <TableCell className=""></TableCell>
                                                        <TableCell className="border">Total Intermédiaire</TableCell>
                                                        <TableCell className="border">+ {totalNet.toFixed(2)}$</TableCell>
                                                        <TableCell className="border text-right">- {totalRet.toFixed(2)}$</TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className="" colSpan={2}></TableCell>
                                                        <TableCell className="border">Net Intermédiaire</TableCell>
                                                        <TableCell colSpan={2} className="border text-right font-bold bg-slate-300">{(totalNet - totalRet).toFixed(2)}$</TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className=""></TableCell>
                                                        <TableCell className=""></TableCell>
                                                        <TableCell className="border font-bold">Prime</TableCell>
                                                        <TableCell colSpan={3} className="border text-right font-bold bg-slate-300">+ {userPayment.prime} $</TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className=""></TableCell>
                                                        <TableCell className=""></TableCell>
                                                        <TableCell className="border">(+) 30% jr de maladie (jr)</TableCell>
                                                        <TableCell className="border text-right"></TableCell>
                                                        <TableCell className="border text-right">+ {userPayment.remMalade}$</TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className=""></TableCell>
                                                        <TableCell className=""></TableCell>
                                                        <TableCell className="border">(+) 70% Congé Circonst. (jr)</TableCell>
                                                        <TableCell className="border text-right"></TableCell>
                                                        <TableCell className="border text-right">+ {userPayment.remCC}$</TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className=""></TableCell>
                                                        <TableCell className=""></TableCell>
                                                        <TableCell className="border">Heure Supplémentaire</TableCell>
                                                        <TableCell className="border text-right"></TableCell>
                                                        <TableCell className="border text-right">+ 0$</TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className=""></TableCell>
                                                        <TableCell className=""></TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell className="border text-right">Net à Payer (USD)</TableCell>
                                                        <TableCell className="border text-right">{(totalNet + userPayment.remCC + userPayment.remMalade + userPayment.prime - totalRet).toFixed(2)}$</TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className=""></TableCell>
                                                        <TableCell className=""></TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell className="border text-right bg-slate-300"></TableCell>
                                                        <TableCell className="border text-right bg-slate-300"></TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className=""></TableCell>
                                                        <TableCell className=""></TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell className="border text-right">Transport Mensuel (USD)</TableCell>
                                                        <TableCell className="border text-right">{userPayment.employee.transportFee}$</TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className=""></TableCell>
                                                        <TableCell className=""></TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell className="border text-right">Indemnité de Kilometrage</TableCell>
                                                        <TableCell className="border text-right">{userPayment.employee.indemnityKm ?? 0}$</TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className=""></TableCell>
                                                        <TableCell className=""></TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell className="border text-right">Net à Payer (USD)</TableCell>
                                                        <TableCell className="border text-right">{(userPayment.employee.transportFee + (userPayment.employee.indemnityKm ?? 0)).toFixed(2)}$</TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className=""></TableCell>
                                                        <TableCell className=""></TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell className="border text-right bg-slate-300 font-bold text-sm">MONTANT GLOBAL NAP</TableCell>
                                                        <TableCell className="border text-right bg-slate-300 font-bold text-sm">{(totalNet + userPayment.remCC + userPayment.remMalade + userPayment.prime - totalRet + userPayment.employee.transportFee + (userPayment.employee.indemnityKm ?? 0)).toFixed(2)}$</TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className=""></TableCell>
                                                        <TableCell className=""></TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell className="border text-center font-bold p-6">Acquis</TableCell>
                                                        <TableCell className="border text-right"></TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                            <div className="my-8 flex justify-center items-center">La Direction</div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </TabsContent>
                    )
                })
            }
        </Tabs>
    )
}