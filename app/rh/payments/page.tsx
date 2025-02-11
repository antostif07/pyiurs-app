import { objectToUrlParams } from "@/src/lib/objectToUrlParams";
import apiGetData from "@/src/actions/apiGetData";
import { Assignment } from "@/src/common/Assignment";
import { getSession } from "@/src/actions/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentToClose from "./ui/PaymentToClose";

export default async function Payments(props: {searchParams: Promise<{search?: string, 'employee.assignment'?: string}>}) {
  const searchParams = await props.searchParams
  const urlParams = objectToUrlParams({month: searchParams.search, assignment: searchParams["employee.assignment"]})
  const affectations = await apiGetData<Assignment>('/assignments', 'assignments')
  
  const tabs = [
    {
        id: "payment_to_close", name: "Mois à clotûrer"
    },
    {
        id: "payments_closed", name: "Liste des mois clotûrés"
    },
  ]

  const aff = affectations['hydra:member'] ?? []

  return (
    <div className="">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Cloture de Paie</h1>
      </div>
      <Tabs className="mt-4" defaultValue={"payment_to_close"}>
            <TabsList>
                {
                    tabs.map((tab: {id: string, name: string}, index: number) => (
                        <TabsTrigger key={index} value={tab.id}>{tab.name}</TabsTrigger>
                    ))
                }
            </TabsList>
            {
                tabs.map((tab: {name: string, id: string}, index: number) => (
                    <TabsContent key={index} value={tab.id}>
                        {
                            tab.id === "payment_to_close" ? <PaymentToClose dataAffectations={aff} searchParams={urlParams} /> : <div>Liste</div>
                        }
                    </TabsContent>
                ))
            }
        </Tabs>
    </div>
    )
}