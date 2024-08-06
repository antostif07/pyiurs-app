import CreateAuditForm from "../../../src/ui/CreateAuditForm"

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

export default async function AddAuditMission() {
    const data = await getData()

    return (
        <div className="pt-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Créer une mission d'audit</h1>
            </div>
            <div className="mt-8">
                <CreateAuditForm affectations={data['hydra:member']} />
            </div>
        </div>
    )
}