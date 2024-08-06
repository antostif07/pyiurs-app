import DateRangeInput from "@/src/ui/attendances/date-range";
import SelectAssignment from "@/src/ui/payments/SelectAssignment";
import TableWrapper from "./table-wrapper";

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

export default async function Payments({
    searchParams,
  }: {
    searchParams?: {
      "attendanceDateTime[after]"?: string;
      "attendanceDateTime[before]"?: string;
      "employee.assignment"?: string;
    };
  }) {
    const affectations = await getAssignments()
    const after = searchParams && searchParams["attendanceDateTime[after]"]
    const before = searchParams && searchParams["attendanceDateTime[before]"]
    const assignment = searchParams && searchParams["employee.assignment"]
    
    return (
        <div className="pt-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Paiements</h1>
            </div>
            <div className="flex justify-between pt-4">
                <div className="flex gap-8 items-center">
                  <div>
                    <DateRangeInput />
                  </div>
                  <div>
                    <SelectAssignment affectations={affectations['hydra:member']} />
                  </div>
                </div>
            </div>
            <div className="mt-8">
              <TableWrapper
                sParams={{
                  "attendanceDateTime[after]": after, 
                  "attendanceDateTime[before]": before,
                  "employee.assignment": assignment
                }} />
            </div>
        </div>
    )
}