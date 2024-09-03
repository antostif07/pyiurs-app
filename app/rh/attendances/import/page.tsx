import CreateForm from "@/src/ui/attendances/create-form";

const getData = async () => {
    const res = await fetch(`${process.env.API_URL}/employees`, {
      headers: {
        "content-type": "application/ld+json"
      },
      cache: 'no-cache'
    })
    return res.json()
  }

export default async function Page() {
    const data = await getData()
    
    return (
        <div className="pt-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Importer les présences</h1>
                <a href="/attendance_template.xlsx" className="underline">
                  Telecharger un modèle de fichier
                </a>
            </div>
            <div className="mt-8">
                <CreateForm employees={data['hydra:member']} />
            </div>
        </div>
    )
}