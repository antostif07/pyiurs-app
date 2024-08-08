import { DataTable } from "../DataTable"
import { columns } from "./columns"

const getData = async (searchParams?: any) => {
  const res = await fetch(`${process.env.API_URL}/attendances?page=${searchParams?.page}&attendanceDateTime[after]=${searchParams?.after}&attendanceDateTime[before]=${searchParams?.before}`, {
    headers: {
      "content-type": "application/ld+json"
    },
    next: {revalidate: 5, tags: ["attendances"]}
  })

  return res.json()
  }

export default async function TableWrapper({sParams}: {sParams: any}) {
    const data = await getData(sParams)
    
    const attendances = data && data['hydra:member'] ? data['hydra:member'] : []
    const totalPages = data && data['hydra:totalItems'] ? data['hydra:totalItems'] : 1

    return (
        <DataTable columns={columns} data={attendances} totalPages={totalPages} />
    )
}