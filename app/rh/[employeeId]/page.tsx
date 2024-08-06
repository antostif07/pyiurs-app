import MonthFilter from "@/src/ui/attendances/month-filter"
import AttendancesTable from "@/src/ui/attendances/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const getEmployee = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}/employees/${id}`, {
    headers: {
      "content-type": "application/ld+json"
    },
    next: {
      revalidate: 120
    },
  })

  const resp = await res.json()
  return resp
}

const getEmployeeAttendances = async (id: string, filters: any) => {
  const res = await fetch(
    `${process.env.API_URL}/attendances?employee.id=${id}&attendanceDateTime[after]=${filters["attendanceDateTime[after]"]}&attendanceDateTime[before]=${filters["attendanceDateTime[before]"]}`, {
    headers: {
      "content-type": "application/ld+json"
    },
    next: {
      revalidate: 5
    },
  })

  const resp = await res.json()
  
  return resp
}

export default async function Page({params, searchParams}: any) {
    const {employeeId} = params
    
    const employeeData = getEmployee(employeeId)
    const attendancesData = getEmployeeAttendances(employeeId, searchParams)

    const [employee, attendances] = await Promise.all([employeeData, attendancesData])
    
    return (
        <div className="pt-8">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">{employee && employee.name}</h1>
            </div>
            <div className="flex">
              <div className="w-full">
                <div>
                  <span className="font-bold">Affectation: </span><span>{employee.assignment.name}</span>
                </div>
                <div>
                  <span className="font-bold">Transport: </span><span>{employee.transportFee} $</span>
                </div>
                <div>
                  <span className="font-bold">Salaire: </span><span>{employee.salary} $</span>
                </div>
                <div>
                  <span className="font-bold">Nb des jours: </span><span>{employee.total_days ?? 26}j</span>
                </div>
              </div>
              <div className="w-full">
                <MonthFilter />
              </div>
            </div>
            <div className="mt-8">
              <div className="flex justify-end">
                <Link href={`rh/add/${employeeId}/attendance`}>
                  <Button>Ajouter une présence</Button>
                </Link>
              </div>
              <h1 className="text-xl font-bold">Présences</h1>
              <AttendancesTable attendances={attendances['hydra:member']} />
            </div>
        </div>
    )
}