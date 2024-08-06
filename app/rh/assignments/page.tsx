import AssignmentTable from "@/src/ui/assignments/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const getData = async () => {
  const res = await fetch(`${process.env.API_URL}/assignments`, {
    headers: {
      "content-type": "application/ld+json"
    },
    next: {
      revalidate: 5
    }
  })
  return res.json()
}

export default async function Page() {
  const data = await getData()

    return (
      <div className="pt-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Affectations</h1>
                <Link href={"assignments/add"}>
                  <Button>Ajouter</Button>
                </Link>
            </div>
            <div className="mt-8">
              <AssignmentTable assignments={data['hydra:member']} />
            </div>
        </div>
    )
}