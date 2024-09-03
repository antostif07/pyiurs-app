import AssignmentTable from "@/src/ui/assignments/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const getData = async () => {
  const res = await fetch(`${process.env.API_URL}/assignments`, {
    headers: {
      "content-type": "application/ld+json",
      // "Authorization": `Bearer ${token}`
    },
  })
  return res.json()
}

export default async function Page() {
  const data = await getData()
  const assignments = data && data['hydra:member'] ? data['hydra:member'] : []

  return (
    <div className="pt-8">
          <div className="flex justify-between">
              <h1 className="text-2xl font-bold">Affectations</h1>
              <Link href={"assignments/add"}>
                <Button>Ajouter</Button>
              </Link>
          </div>
          <div className="mt-8">
            <AssignmentTable assignments={assignments} />
          </div>
      </div>
  )
}