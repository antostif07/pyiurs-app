import { Button } from "@/components/ui/button";
import AuditTable from "@/src/ui/AuditTable";
import Link from "next/link";
import { Suspense } from "react";

const getData = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/audits`, {
      headers: {
        "content-type": "application/ld+json"
      },
      next: {
        revalidate: 120
      },
    })
    
    const resp = await res.json()
    return resp
  } catch (error) {
    console.log(error);
  }
}

export default async function Audit() {
  const data = await getData()

  const audits = data ? data['hydra:member'] : []
  

  return (
      <div className="pt-8">
          <div className="flex justify-between sm:flex-row flex-col">
              <h1 className="text-2xl font-bold mb-2">Missions D'audit</h1>
              <Link href={"audit/add"}>
                <Button>Créer une mission</Button>
              </Link>
          </div>
          <div className="mt-8">
            <Suspense fallback={<div>Loading</div>}>
              <AuditTable audits={audits} />
            </Suspense>
          </div>
      </div>
  )
}