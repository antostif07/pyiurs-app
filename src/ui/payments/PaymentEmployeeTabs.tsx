import PaymentToClose from "@/app/rh/payments/ui/PaymentToClose";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import apiGetData from "@/src/actions/apiGetData";
import { Assignment } from "@/src/common/Assignment";
import { objectToUrlParams } from "@/src/lib/objectToUrlParams";

export default async function PaymentEmployeeTabs () {
    
    const tabs = [
        {
            id: "payment_to_close", name: "Mois à clotûrer"
        },
        {
            id: "payments_closed", name: "Liste des mois clotûrés"
        },
    ]

    return (
        <Tabs className="mt-4" defaultValue={"payment_to_close"}>
            <TabsList>
                {
                    tabs.map((tab: {id: string, name: string}, index: number) => (
                        <TabsTrigger key={index} value={tab.id}>{tab.name}</TabsTrigger>
                    ))
                }
            </TabsList>
            {/* {
                tabs.map((tab: {name: string, id: string}, index: number) => (
                    <TabsContent key={index} value={tab.id}>
                        {
                            tab.id === "payment_to_close" ? <PaymentToClose dataAffectations={dataAffectations} /> : <div>Liste</div>
                        }
                    </TabsContent>
                ))
            } */}
        </Tabs>
    )
}