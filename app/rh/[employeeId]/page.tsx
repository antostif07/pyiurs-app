import {Badge} from "@/components/ui/badge";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {IEmployeeDebt} from "@/src/types/IEmployeeDebt";
import {IEmployeePrime} from "@/src/ui/employee-prime/IEmployeePrime";
import DebtDialog from "@/src/ui/employees/DebtDialog";
import {Employee as IEmployee} from "@/src/ui/employees/Employee";
import PrimeDialog from "@/src/ui/employees/PrimeDialog";
import {AvatarIcon} from "@radix-ui/react-icons";
import {Tabs} from "@radix-ui/react-tabs";
import {getSession} from "@/src/actions/auth";

const getEmployee = async (id: string) => {
  try {
      const session = await getSession()
      const res = await fetch(`${process.env.API_URL}/employees/${id}`, {
          headers: {
              "content-type": "application/ld+json",
              'Authorization': `Bearer ${session.token}`
          },
          next: {
            tags: ["employees"],
          },
        })

      return await res.json()
  } catch (error) {
      console.log(error);
  }
}

  const getEmployeePrimes = async (id: string) => {
    try {
        const session = await getSession()
        const res = await fetch(`${process.env.API_URL}/employee_primes?employee=${id}`, {
            headers: {
              "content-type": "application/ld+json",
                'Authorization': `Bearer ${session.token}`
            },
            cache: 'no-store'
          })

        return await res.json()
    } catch (error) {
        console.log(error);
    }
  }

  const getEmployeeDebts = async (id: string) => {
    try {
        const session = await getSession()
        const res = await fetch(`${process.env.API_URL}/employee_debts?employee=${id}`, {
            headers: {
              "content-type": "application/ld+json",
                'Authorization': `Bearer ${session.token}`
            },
            next: {
                tags: ["employee_debts"]
            },
            cache: 'no-store'
          })

        return await res.json()
    } catch (error) {
        console.log(error);
    }
  }

  export default async function Employee({params}: any) {
      const {employeeId} = params
      const employee: IEmployee|undefined = await getEmployee(employeeId)
      const employeePrimes: {'hydra:totalItems': number, 'hydra:member': IEmployeePrime[]} = await getEmployeePrimes(employeeId)
      const employeeDebts: {'hydra:totalItems': number, 'hydra:member': IEmployeeDebt[]} = await getEmployeeDebts(employeeId)

      console.log(employee)
      const tabs = [
        "Informations Principales", "Primes", "Dettes",
      ]
      
      return (
          <div className="pt-8">
              <div className="flex items-center gap-3">
                <div>
                  <AvatarIcon className="w-20 h-20 text-gray-400" />
                </div>
                <div>
                  <h2 className="capitalize text-3xl font-bold">{employee && employee.name}</h2>
                  <h3 className="capitalize italic">{employee?.job_status} - {employee?.matricule}</h3>
                </div>
              </div>
              <Tabs className="mt-8" defaultValue={tabs[0]}>
                <TabsList>
                  {
                      tabs.map((tab: string, index: number) => (
                          <TabsTrigger key={index} value={tab}>{tab}</TabsTrigger>
                      ))
                  }
                </TabsList>
                <TabsContent value={tabs[0]}>
                  <div className="grid grid-cols-2">
                    <div  className="flex flex-col gap-2">
                      <div className="gap-2 flex">
                        <span className="font-bold">Affectation:</span><span>{employee?.assignment.name}</span>
                      </div>
                      <div className="gap-2 flex">
                        <span className="font-bold">Salaire:</span><span>{employee?.salary} $</span>
                      </div>
                      <div className="gap-2 flex">
                        <span className="font-bold">Transport:</span><span>{employee?.transportFee} $</span>
                      </div>
                      <div className="gap-2 flex">
                        <span className="font-bold">Adresse:</span><span>{employee?.address}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="gap-2 flex">
                        <span className="font-bold">Email:</span><span>{employee?.email}</span>
                      </div>
                      <div className="gap-2 flex">
                        <span className="font-bold">Tel:</span><span>{employee?.tel}</span>
                      </div>
                      <div className="gap-2 flex">
                        <span className="font-bold">Fonction:</span><span>{employee?.employee_function}</span>
                      </div>
                      <div className="gap-2 flex">
                        <span className="font-bold">Departement:</span><span>{employee?.department}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="Primes">
                  <div className="flex justify-end">
                    {employee && <PrimeDialog employee={employee} />}
                  </div>
                  <Table className="mt-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Mois</TableHead>
                        <TableHead>Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {
                        employeePrimes && employeePrimes['hydra:totalItems'] > 0 ? employeePrimes['hydra:member'].map((employeePrime: IEmployeePrime) => (
                          <TableRow key={employeePrime.id}>
                            <TableCell>{employeePrime.description}</TableCell>
                            <TableCell>{employeePrime.amount} $</TableCell>
                            <TableCell>{employeePrime.month}</TableCell>
                          </TableRow>
                        )) : (
                          <TableRow>
                            <TableCell colSpan={4}>
                              <div className="flex items-center justify-center min-h-48">Aucun Prime</div>
                            </TableCell>
                          </TableRow>
                        )
                      }
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="Dettes">
                  <div className="flex justify-end">
                    {employee && <DebtDialog employee={employee} />}
                  </div>
                  <Table className="mt-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Reste</TableHead>
                        <TableHead>Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {
                        employeeDebts && employeeDebts['hydra:totalItems'] > 0 ? employeeDebts['hydra:member'].map((employeeDebt: IEmployeeDebt) => (
                          <TableRow key={employeeDebt.id}>
                            <TableCell>{employeeDebt.description}</TableCell>
                            <TableCell>{employeeDebt.amount} $</TableCell>
                            <TableCell>{employeeDebt.rest} $</TableCell>
                            <TableCell>
                              <Badge variant={employeeDebt.isTotallyPaid ? "secondary" : "default"}>
                              {employeeDebt.isTotallyPaid ? "Payé" : "Non Payé"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        )) : (
                          <TableRow>
                            <TableCell colSpan={4}>
                              <div className="flex items-center justify-center min-h-48">Aucune dette</div>
                            </TableCell>
                          </TableRow>
                        )
                      }
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
          </div>
      )
  }