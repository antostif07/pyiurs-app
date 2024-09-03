import CreateForm from "@/src/ui/employees/create-form";

const getData = async () => {
    const res = await fetch(`${process.env.API_URL}/assignments`, {
      headers: {
        "content-type": "application/ld+json"
      },
      cache: 'no-store'
    })

    console.log(res)

    const result = await res.json()
    
    return result

  }

export default async function AddEmployee() {
    const data = await getData()

    return (
        <div className="pt-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Ajouter un employé</h1>
            </div>
            <div className="mt-8">
                <CreateForm affectations={data['hydra:member']} />
            </div>
        </div>
    )
}