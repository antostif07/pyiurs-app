'use client'

import { Audit } from "@/src/common/Audit"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import ReportSummaryAudit from "./audit/ReportSummaryAudit"
import ReportDetailsAudit from "./audit/ReportDetailsAudit"
// import jsPDF from "jspdf"


export default function AuditReport(
    {audit, baseProducts, manquants, resultProducts}: {audit: Audit, baseProducts: any, manquants: any, resultProducts: any}
) {
    const generatePdf = () => {
        ReportSummaryAudit({
            audit, baseProducts, manquants, resultProducts
        });
    }

    const generateResultPdf = () => {
        ReportDetailsAudit({
            audit, baseProducts, manquants, resultProducts
        });
    }

    return (
        <>
            <div className="text-center text-pink-500">
                <h1 className="mt-8 text-3xl">RAPPORT D'AUDIT</h1>
                <h2 className="text-xl">Lieu: {audit.assignment.name}</h2>
                <p className="underline">{format(audit.start_date, "MMMM yyyy")}</p>
            </div>
            <p className="mt-8">Ci-dessous le résultat avant analyse : </p>
            <Table>
                <TableHeader>
                    <TableRow className="text-black">
                        <TableCell className="w-full">1. Données</TableCell>
                        <TableCell className="w-[240px]">#</TableCell>
                        <TableCell className="w-full">$</TableCell>
                        <TableCell className="w-full">%</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="w-full font-bold whitespace-nowrap">I. Base Théorique</TableCell>
                        <TableCell className="w-full whitespace-nowrap">{baseProducts.length}</TableCell>
                        <TableCell className="w-full whitespace-nowrap">{baseProducts.reduce((acc: number, item: any) => acc + item['PV'], 0)} $</TableCell>
                        <TableCell className="w-full whitespace-nowrap">100 %</TableCell>   
                    </TableRow>
                    <TableRow>
                        <TableCell className="w-full font-bold whitespace-nowrap">II. Qté Théorique</TableCell>
                        <TableCell className="w-full whitespace-nowrap">{baseProducts.length}</TableCell>
                        {/* @ts-ignore */}
                        <TableCell className="w-full whitespace-nowrap">{baseProducts.reduce((acc, item) => acc + item['PV'], 0)} $</TableCell>
                        <TableCell className="w-full whitespace-nowrap">100 %</TableCell>   
                    </TableRow>
                </TableBody>
            </Table>
            <Table className="mt-8">
                <TableHeader>
                    <TableRow className="text-black">
                        <TableCell className="w-full">2. Comptage physique</TableCell>
                        <TableCell className="w-[80px]">#</TableCell>
                        <TableCell className="w-[40px]">$</TableCell>
                        <TableCell className="w-[40px]">%</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="w-full font-bold whitespace-nowrap">III. Qte. Comptée</TableCell>
                        <TableCell className="w-full whitespace-nowrap">{resultProducts.length}</TableCell>
                        <TableCell className="w-full whitespace-nowrap">0</TableCell>
                        <TableCell className="w-full whitespace-nowrap">0</TableCell>   
                    </TableRow>
                    <TableRow>
                        <TableCell className="w-full font-bold whitespace-nowrap">IV. Manquant (I-III)</TableCell>
                        <TableCell className="w-full whitespace-nowrap">{manquants.length}</TableCell>
                        <TableCell className="w-full whitespace-nowrap">{manquants.reduce((acc:number, item: any) => acc + item['PV'], 0)} $</TableCell>
                        <TableCell className="w-full whitespace-nowrap">0</TableCell>   
                    </TableRow>
                </TableBody>
            </Table>
            <Table className="mt-8">
                <TableHeader>
                    <TableRow className="text-black">
                        <TableCell className="w-full">3. Analyse des manquants</TableCell>
                        <TableCell className="w-[80px]">#</TableCell>
                        <TableCell className="w-[40px]">$</TableCell>
                        <TableCell className="w-[40px]">%</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="w-full font-bold whitespace-nowrap">V. Stock d'ailleurs</TableCell>
                        <TableCell className="w-full whitespace-nowrap">{manquants.filter((m: any) => m.sellStatus && m["Quantité disponible"] < 0).length}</TableCell>
                        <TableCell className="w-full whitespace-nowrap">{manquants.filter((m: any) => m.sellStatus && m["Quantité disponible"] < 0).reduce((acc: number, item: any) => acc + item['PV'], 0)} $</TableCell>
                        <TableCell className="w-full whitespace-nowrap">{manquants.length > 0 ? ((manquants.filter((m: any) => (m.sellStatus && m["Quantité disponible"] < 0)).length / manquants.length)*100).toFixed(0) : 0}%</TableCell>   
                    </TableRow>
                    <TableRow>
                        <TableCell className="w-full font-bold whitespace-nowrap">VI. Stock Interne</TableCell>
                        <TableCell className="w-full whitespace-nowrap">{manquants.filter((m: any) => (m.sellStatus && m["Quantité disponible"] >= 0 || !m.sellStatus)).length}</TableCell>
                        {/* @ts-ignore */}
                        <TableCell className="w-full whitespace-nowrap">{manquants.filter((m: any) => (m.sellStatus && m["Quantité disponible"] >= 0 || !m.sellStatus)).reduce((acc, item) => acc + item['PV'], 0)} $</TableCell>
                        <TableCell className="w-full whitespace-nowrap">{manquants.length > 0 ? ((manquants.filter((m: any) => (m.sellStatus && m["Quantité disponible"] >= 0 || !m.sellStatus)).length / manquants.length)*100).toFixed(0) : 0}%</TableCell>   
                    </TableRow>
                </TableBody>
            </Table>
            <Table className="mt-8">
                <TableHeader>
                    <TableRow className="text-black">
                        <TableCell className="w-full">4. Analyse des manquants internes</TableCell>
                        <TableCell className="w-[80px]">#</TableCell>
                        <TableCell className="w-[40px]">$</TableCell>
                        <TableCell className="w-[40px]">%</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="w-full font-bold whitespace-nowrap">VII. Vendu</TableCell>
                        <TableCell className="w-full whitespace-nowrap">{manquants.filter((m: any) => m.sellStatus && m["Quantité disponible"] >= 0).length}</TableCell>
                        <TableCell className="w-full whitespace-nowrap">{manquants.filter((m: any) => m.sellStatus && m["Quantité disponible"] >= 0).reduce((acc: number, item: any) => acc + item['PV'], 0)} $</TableCell>
                        <TableCell className="w-full whitespace-nowrap">{manquants.filter((m: any) => (m.sellStatus && m["Quantité disponible"] >= 0 || !m.sellStatus)).length !== 0 ? ((manquants.filter((m: any) => m.sellStatus && m["Quantité disponible"] >= 0).length / manquants.filter((m: any) => (m.sellStatus && m["Quantité disponible"] >= 0 || !m.sellStatus)).length) * 100).toFixed(0) : 0} %   </TableCell>   
                    </TableRow>
                    <TableRow>
                        <TableCell className="w-full font-bold whitespace-nowrap">VIII. Non vendu </TableCell>
                        {/* @ts-ignore */}
                        <TableCell className="w-full whitespace-nowrap">{manquants.filter(m => !m.sellStatus).length}</TableCell>
                        <TableCell className="w-full whitespace-nowrap">{manquants.filter((m: any) => !m.sellStatus).reduce((acc: number, item: any) => acc + item['PV'], 0)} $</TableCell>
                        <TableCell className="w-full whitespace-nowrap">{manquants.filter((m: any) => (m.sellStatus && m["Quantité disponible"] >= 0 || !m.sellStatus)).length !== 0 ? ((manquants.filter((m: any) => !m.sellStatus).length / manquants.filter((m: any) => (m.sellStatus && m["Quantité disponible"] >= 0 || !m.sellStatus)).length) * 100).toFixed(0) : 0} %</TableCell>   
                    </TableRow>
                </TableBody>
            </Table>
            <div className="flex gap-3">
                <Button className="my-8" onClick={generatePdf}>Imprimer le Tableau de Résultat</Button>
                <Button className="my-8" onClick={generateResultPdf}>Imprimer le Rapport D'Audit</Button>
            </div>
        </>
    )
}