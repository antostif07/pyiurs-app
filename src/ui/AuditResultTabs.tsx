import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Suspense} from "react";
import { Audit } from "@/src/common/Audit";
import ButtonAddBaseFile from "@/src/ui/ButtonAddBaseFile";
import BaseProducts from "@/app/audit/[auditId]/base-products";
import LoadingPage from "@/src/ui/LoadingPage";
import ButtonAddResultFile from "@/src/ui/ButtonAddResultFile";
import ResultProducts from "@/app/audit/[auditId]/result-products";

export default function AuditResultTabs ({audit, page}: {audit: Audit, page?: string }) {
    return (
        <Tabs className="mb-16" defaultValue={"Base"}>
            <TabsList>
                {
                    ["Base", "Resultat Physique", "Manquant", "Resultat Final"].map((eD, index) => (
                        <TabsTrigger key={index} value={eD}>{eD}</TabsTrigger>
                    ))
                }
            </TabsList>
            <TabsContent value={"Base"}>
                <ButtonAddBaseFile audit={audit} />
                <Suspense fallback={<LoadingPage />}>
                    <BaseProducts audit={audit} page={page} />
                </Suspense>
            </TabsContent>
            <TabsContent value={"Resultat Physique"}>
                <ButtonAddResultFile audit={audit} />
                <Suspense fallback={<LoadingPage />}>
                    <ResultProducts audit={audit} page={page} />
                </Suspense>
            </TabsContent>
            {/*<TabsContent value={"Manquant"}>*/}
            {/*    <div className="flex flex-col sm:flex-row gap-8 sm:gap-0">*/}
            {/*        <div className="w-full">*/}
            {/*            <div className="flex py-2">*/}
            {/*                <div className="w-full px-4">Total: <span className="font-bold">{manquants.length}</span> manquants sur <span className="font-bold">{baseProducts.length}</span> produits dans le système</div>*/}
            {/*                /!* @ts-ignore *!/*/}
            {/*                <div className="w-full px-4">Valeur: <span className="font-bold">{manquants.reduce((acc, item) => item['PV'] ? acc + item['PV'] : acc, 0)} $</span></div>*/}
            {/*            </div>*/}
            {/*            <div className="flex py-2">*/}
            {/*                /!* @ts-ignore *!/*/}
            {/*                <div className="w-full px-4">Total Vendu: <span className="font-bold">{manquants.filter(m => m.sellStatus).length}</span> sur <span className="font-bold">{manquants.length}</span> produits non trouvés</div>*/}
            {/*                /!* @ts-ignore *!/*/}
            {/*                <div  className="w-full px-4">Valeur Vendu: <span className="font-bold">{manquants.filter(m => m.sellStatus).reduce((acc, item) => item['PV'] ? acc + item['PV'] : acc, 0)} $</span></div>*/}
            {/*            </div>*/}
            {/*            <div className="flex py-2">*/}
            {/*                /!* @ts-ignore *!/*/}
            {/*                <div className="w-full px-4">Total Non  Vendu: <span className="font-bold">{manquants.filter(m => !m.sellStatus).length}</span> sur <span className="font-bold">{manquants.length}</span> produits non trouvés</div>*/}
            {/*                /!* @ts-ignore *!/*/}
            {/*                <div className="w-full px-4">Valeur Vendu: <span className="font-bold">{manquants.filter(m => !m.sellStatus).reduce((acc, item) => item['PV'] ? acc + item['PV'] : acc, 0)} $</span></div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="w-full">*/}
            {/*            <Select onValueChange={(e) => setFilterStatus(e)}>*/}
            {/*                <SelectTrigger>*/}
            {/*                    <SelectValue placeholder="Statut" defaultValue={filterStatus} />*/}
            {/*                </SelectTrigger>*/}
            {/*                <SelectContent>*/}
            {/*                    <SelectGroup>*/}
            {/*                        <SelectLabel>Statut de vente</SelectLabel>*/}
            {/*                        <SelectItem value="all">Tout</SelectItem>*/}
            {/*                        <SelectItem value="find">Vendu</SelectItem>*/}
            {/*                        <SelectItem value="not-find">Non Vendu</SelectItem>*/}
            {/*                        <SelectItem value="find-other">Vendu Stock Ailleurs</SelectItem>*/}
            {/*                    </SelectGroup>*/}
            {/*                </SelectContent>*/}
            {/*            </Select>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <Table className="my-6">*/}
            {/*        <TableHeader>*/}
            {/*            <TableRow>*/}
            {/*                <TableHead className="whitespace-nowrap">N</TableHead>*/}
            {/*                <TableHead className="whitespace-nowrap">Vendu</TableHead>*/}
            {/*                {*/}
            {/*                    baseHeader.map((header, index) => (*/}
            {/*                        <TableHead className="whitespace-nowrap" key={`m-${header}-${index}`}>{header}</TableHead>*/}
            {/*                    ))*/}
            {/*                }*/}
            {/*                <TableHead className="whitespace-nowrap">Stock Ailleurs</TableHead>*/}
            {/*            </TableRow>*/}
            {/*        </TableHeader>*/}
            {/*        <TableBody>*/}
            {/*            {*/}
            {/*                // @ts-ignore*/}
            {/*                manquants.filter(m => {*/}
            {/*                    if (filterStatus === "all") { return true}*/}
            {/*                    if (filterStatus === "find") { return m.sellStatus}*/}
            {/*                    if (filterStatus === "not-find") { return !m.sellStatus}*/}
            {/*                    if (filterStatus === "find-other") { return m.sellStatus && m["Quantité disponible"] < 0}*/}
            {/*                    return true*/}
            {/*                })*/}
            {/*                // @ts-ignore*/}
            {/*                .map((b, ii) => { */}
            {/*                    // @ts-ignore*/}
            {/*                    const vendus = totalData.filter(tD => tD["Article/Code barre"] && b["Article/Code barre"] && (tD["Article/Code barre"].toUpperCase().trim() === b["Article/Code barre"].toUpperCase().trim()) && tD["Vendu"])*/}
            {/*                    */}
            {/*                    return (*/}
            {/*                        <TableRow key={`m-${ii}`} className={b.sellStatus ? "" : "bg-red-700 text-white hover:bg-red-800"}>*/}
            {/*                            <TableCell className="font-medium whitespace-nowrap" >{ii + 1}</TableCell>*/}
            {/*                            <TableCell className="font-medium whitespace-nowrap" >{vendus.length < 1 ? "Non Vendu" : "Vendu"}</TableCell>*/}
            {/*                            {*/}
            {/*                                baseHeader.map((bh, i) => (*/}
            {/*                                    <TableCell className="font-medium" key={`m-${bh}-${i}`}>{b[bh]}</TableCell>*/}
            {/*                                ))*/}
            {/*                            }*/}
            {/*                            <TableCell className="font-medium whitespace-nowrap" >{vendus.length > 0 && b["Quantité disponible"] < 0 && vendus[1]["Lieu"]}</TableCell>*/}
            {/*                        </TableRow>*/}
            {/*                    )*/}
            {/*                })*/}
            {/*            }*/}
            {/*        </TableBody>*/}
            {/*    </Table>*/}
            {/*</TabsContent>*/}
            {/*<TabsContent value={"Resultat Final"}>*/}
            {/*    {*/}
            {/*        resultData ? (*/}
            {/*            <AuditReport audit={audit} baseProducts={baseProducts} manquants={manquants} resultProducts={resultData} />*/}
            {/*        ) : (*/}
            {/*            <p>Veuillez ajouter le fichier de resultat</p>*/}
            {/*        )*/}
            {/*    }*/}
            {/*</TabsContent>*/}
        </Tabs>
    )
}