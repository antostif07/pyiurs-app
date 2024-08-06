import { Button } from "@/components/ui/button";
import EmployeesTable from "@/src/ui/employees/table";
import Link from "next/link";

const getData = async () => {
    const res = await fetch(`${process.env.API_URL}/employees`, {
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
  
export default async function Page() {
    const data = await getData()

    return (
        <div className="pt-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Employés</h1>
                <Link href={"rh/add"}>
                  <Button>Ajouter</Button>
                </Link>
            </div>
            <div className="mt-8">
              <EmployeesTable employees={data['hydra:member']} />
            </div>
        </div>
    )
}