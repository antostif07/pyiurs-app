import PaymentTable from "@/src/ui/payments/payment-table"

const getData = async (searchParams?: any) => {
    const params = new URLSearchParams(searchParams)
    const url = new URL(`${process.env.API_URL}/attendances`)
    url.search = params.toString()

    const res = await fetch(url, {
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
    
    const d = data['hydra:member'] ?? []

    return (
        <PaymentTable attendances={d} sParams={sParams} />
    )
}