import DateRangeInput from "@/src/ui/attendances/date-range";
import SelectAssignment from "@/src/ui/payments/SelectAssignment";
import TableWrapper from "./table-wrapper";
import Payment from "@/src/ui/payments/Payment";

const getAssignments = async (searchParams?: any) => {
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

export default async function Payments() {
    const affectations = await getAssignments()
    
    return (
        <div className="">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Cloture de Paie</h1>
            </div>
            <Payment affectations={affectations} />
        </div>
    )
}