import { Audit } from "@/src/common/Audit"
import { format } from "date-fns"
import { Suspense } from "react"
import AuditResultTabs from "../../../src/ui/AuditResultTabs"
import ButtonAddResultFile from "../../../src/ui/ButtonAddResultFile"
import LoadingPage from "@/src/ui/LoadingPage"
import AuditResultTabsBeauty from "@/src/ui/AuditResultTabsBeauty"
import apiGetSingleData from "@/src/actions/apiGetSingleData";

export default async function Page({params, searchParams}: {params: Promise<{auditId: string}>, searchParams?: Promise<{ page?: string }>}) {
    const auditId = (await params).auditId
    const sp = await searchParams

    const audit = await apiGetSingleData<Audit>(`/audits`, auditId, 'audits')

    return <Other audit={audit.data} page={sp?.page} />
}

const Beauty = ({audit, baseData, resultData, totalData}: {audit: Audit, baseData: any, resultData: any, totalData: any}) => {
    
    return (
        <Suspense fallback={<LoadingPage />}>
            <div className="pt-8">
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-bold">{audit && audit.name}</h1>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
                    <div className="w-full">
                        <div>
                        <span className="font-bold">Boutique: </span><span>{audit.assignment.name}</span>
                        </div>
                        <div>
                        <span className="font-bold">Date de Debut: </span><span>{format(audit.start_date, "dd-MM-yyyy")}</span>
                        </div>
                        <div>
                        <span className="font-bold">Segment: </span><span>{audit.segment}</span>
                        </div>
                        <div>
                        <span className="font-bold">Categories: </span><span>{audit.categories}</span>
                        </div>
                    </div>
                    <div className="w-full">
                        <ButtonAddResultFile audit={audit} />
                    </div>
                </div>
                <div className="mt-8">
                    <AuditResultTabsBeauty baseData={baseData} resultData={resultData} totalData={totalData} audit={audit}  />
                </div>
                <div className="h-96 w-full sm:h-0 sm:w-0"></div>
            </div>
        </Suspense>
    )
}
const Other = ({audit, page}: {audit: Audit, page?: string}) => {

    return (
        <Suspense fallback={<LoadingPage />}>
            <div className="pt-8">
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-bold">{audit && audit.name}</h1>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
                    <div className="w-full">
                        <div>
                        <span className="font-bold">Boutique: </span><span>{audit.assignment.name}</span>
                        </div>
                        <div>
                        <span className="font-bold">Date de Debut: </span><span>{format(audit.start_date, "dd-MM-yyyy")}</span>
                        </div>
                        <div>
                        <span className="font-bold">Segment: </span><span>{audit.segment}</span>
                        </div>
                        <div>
                        <span className="font-bold">Categories: </span><span>{audit.categories}</span>
                        </div>
                    </div>
                    <div className="w-full">
                        <ButtonAddResultFile audit={audit} />
                    </div>
                </div>
                <div className="mt-8">
                    <AuditResultTabs audit={audit} page={page} />
                </div>
                <div className="h-96 w-full sm:h-0 sm:w-0"></div>
            </div>
        </Suspense>
    )
}