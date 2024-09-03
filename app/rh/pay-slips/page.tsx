import Main from "./ui/Main";

const getAssignments = async (searchParams?: any) => {
  const res = await fetch(`${process.env.API_URL}/assignments`, {
    headers: {
      "content-type": "application/ld+json"
    },
  })
  return res.json()
}

export default async function PaySlips () {
    const affectations: any = await getAssignments()
    
    return (
         <div className="pt-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Vérifier les bulletins de paie</h1>
            </div>
            <Main affectations={affectations} />
        </div>
    )
}