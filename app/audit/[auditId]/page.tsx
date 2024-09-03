import { Audit } from "@/src/common/Audit"
import { transformData } from "@/src/lib/transformData"
import { format } from "date-fns"
import { Suspense } from "react"
import * as XLSX from 'xlsx'
import AuditResultTabs from "../../../src/ui/AuditResultTabs"
import ButtonAddResultFile from "../../../src/ui/ButtonAddResultFile"
import LoadingPage from "@/src/ui/LoadingPage"
import AuditResultTabsBeauty from "@/src/ui/AuditResultTabsBeauty"

const getAudit = async (id: string) => {
    try {
        const res = await fetch(`${process.env.API_URL}/audits/${id}`, {
            headers: {
              "content-type": "application/ld+json"
            },
            next: {
              revalidate: 120
            },
          })
          
          const resp = await res.json()
          return resp
    } catch (error) {
        console.log(error);
    }
  
}

export default async function Page({params}: any) {
    const {auditId} = params
    
    const audit: Audit = await getAudit(auditId)
    const file = await (await fetch(`${process.env.NEXT_PUBLIC_URL}${audit.baseFile.contentUrl}`)).arrayBuffer();
    const resultFile = audit.resultFile ? await (await fetch(`${process.env.NEXT_PUBLIC_URL}${audit.resultFile.contentUrl}`)).arrayBuffer() : null
    const totalBaseFile = audit.totalBaseFile ? await (await fetch(`${process.env.NEXT_PUBLIC_URL}${audit.totalBaseFile.contentUrl}`)).arrayBuffer() : null
    
    const workbook = XLSX.read(file, {'type': 'array'});
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const raw_data = XLSX.utils.sheet_to_json(sheet, {header: 1})
    const baseData = transformData(raw_data)
    
    const workbookR = resultFile ? XLSX.read(resultFile, {'type': 'array'}) : null
    const sheetNameR = workbookR ? workbookR.SheetNames[0] : null
    const sheetR = sheetNameR && workbookR ? workbookR.Sheets[sheetNameR] : null
    const raw_dataR = sheetR ? XLSX.utils.sheet_to_json(sheetR, {header: 1}) : null
    const resultData = raw_dataR ? transformData(raw_dataR) : null

    const workbookTotal = totalBaseFile ? XLSX.read(totalBaseFile, {'type': 'array'}) : null
    const sheetNameTotal = workbookTotal ? workbookTotal.SheetNames[0] : null
    const sheetTotal = workbookTotal && sheetNameTotal ? workbookTotal.Sheets[sheetNameTotal] : null
    const raw_dataTotal = sheetTotal ? XLSX.utils.sheet_to_json(sheetTotal, {header: 1}) : null
    const totalData = raw_dataTotal ? transformData(raw_dataTotal) : null

    if(audit.segment === "Beauty") {
        return <Beauty audit={audit} baseData={baseData} totalData={totalData} resultData={resultData} />
    }

    return <Other audit={audit} baseData={baseData} totalData={totalData} resultData={resultData} />
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
const Other = ({audit, baseData, resultData, totalData}: {audit: Audit, baseData: any, resultData: any, totalData: any}) => {
    
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
                    <AuditResultTabs baseData={baseData} resultData={resultData} totalData={totalData} audit={audit}  />
                </div>
                <div className="h-96 w-full sm:h-0 sm:w-0"></div>
            </div>
        </Suspense>
    )
}