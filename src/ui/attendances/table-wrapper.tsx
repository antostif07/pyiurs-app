import AttendancesTable from "./table"

const getData = async (searchParams?: any) => {
    const res = await fetch(`${process.env.API_URL}/attendances?attendanceDateTime[after]=${searchParams?.after}&attendanceDateTime[before]=${searchParams?.before}`, {
      headers: {
        "content-type": "application/ld+json"
      },
      next: {
        revalidate: 5
      }
    })
    return res.json()
  }

export default async function TableWrapper({sParams}: {sParams: any}) {
    const data = await getData(sParams)
    
    return (
        <AttendancesTable attendances={data['hydra:member']} />
    )
}