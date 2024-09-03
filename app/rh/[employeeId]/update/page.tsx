import CreateForm from "@/src/ui/employees/create-form";

const getData = async () => {
  const res = await fetch(`${process.env.API_URL}/assignments`, {
    headers: {
      "content-type": "application/ld+json",
            // "Authorization": `Bearer ${session?.user.access_token}`
    },
    next: {
      revalidate: 5, tags: ["employees"],
    }
  })
  return res.json()
}

const getEmployee = async (id: string) => {
  try {
    const res = await fetch(`${process.env.API_URL}/employees/${id}`, {
        headers: {
          "content-type": "application/ld+json",
          // "Authorization": `Bearer ${session?.user.access_token}`
        },
        cache: "no-cache"
      })
      
      const resp = await res.json()

      return resp
  } catch (error) {
      console.log(error);
  }
}

export default async function UpdateEmployee({params}: any) {
    const data = await getData()
    const {employeeId} = params
    const employee = await getEmployee(employeeId)

    return (
        <div className="pt-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Ajouter un employé</h1>
            </div>
            <div className="mt-8">
                <CreateForm affectations={data['hydra:member']} employee={employee} />
            </div>
        </div>
    )
}