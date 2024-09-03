import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { Audit } from '@/src/common/Audit';

interface IReportDetailsAudit {
  audit: Audit;
  baseProducts: any;
  manquants: any;
  resultProducts: any;
}
// Define the PdfGenerator component
const ReportDetailsAudit = ({audit, baseProducts, manquants, resultProducts}: IReportDetailsAudit) => {

  //
  const manquantsAilleurs = manquants.filter((m: any) => m.sellStatus && m["Quantité disponible"] < 0)
  const mInternes = manquants.filter((m: any) => (m.sellStatus && m["Quantité disponible"] >= 0 || !m.sellStatus))
  const mInternesSelled = manquants.filter((m: any) => m.sellStatus && m["Quantité disponible"] >= 0)
  const mInternesNotSelled = manquants.filter((m: any) => !m.sellStatus)
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Set document properties
    pdf.setProperties({
        title: `Rapport d'Audit ${audit.name}`
    })

    const pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();

    // Add images and text to the PDF
    const callImage = new Image()
    callImage.src = "/images/logo-pyiurs.png"
    
    pdf.addImage(callImage, "PNG", 8, 4, 60, 20)
    pdf.setFontSize(16);
    pdf.setFont('Helvetica', 'bold');
    pdf.text('Pyiurs Boutiques', 150, 12);

    pdf.setFontSize(10)
    pdf.setFont('Arial', 'normal');
    pdf.text("Av. Colonel Mpia, 37A - Kinshasa/Ngaliema - Id.Nat. 01-G4701-N39612B - RCCM: CD/KNG/RCCM/18-A-04301", pageWidth / 2, pageHeight -270, {align: "center"})

    // Line color (RGB)
    pdf.setLineWidth(0.1)
    pdf.setDrawColor(200, 200, 200);
    pdf.line(10, 29, 200, 29)
    
    // Title
    pdf.setFontSize(18)
    pdf.setFont('custom', 'bold');
    pdf.setTextColor(241,19,145);
    pdf.text("RAPPORT D'AUDIT", pageWidth / 2, pageHeight - 250, {align: "center"})

    // Lieu
    pdf.setFontSize(13)
    pdf.setFont('custom', 'bold');
    pdf.setTextColor(241,19,145);
    pdf.text(`Lieu: ${audit.assignment.name}`, pageWidth / 2, pageHeight - 240, {align: "center"})

    // audit name
    pdf.setFontSize(13)
    pdf.setFont('custom', 'bold');
    pdf.setTextColor(241,19,145);
    pdf.text(`${audit.name} - ${format(audit.start_date, "yyyy MMM")}`, pageWidth / 2, pageHeight - 235, {align: "center"})

    //Nom
    pdf.setFontSize(12)
    pdf.setTextColor(0,0,0);
    pdf.text("Ci-dessous le résultat d' analyse :", 12, pageHeight - 220)
    
    pdf.setFont('custom', 'bold');
    pdf.text(`Analyse des manquants`, pageWidth / 2, pageHeight - 210, {align: "center"})
    pdf.text(`Produits non trouvés: Manquants`, pageWidth / 2, pageHeight - 205, {align: "center"})

  //   {
  //     "Article/Code barre": "VF83487",
  //     "Lieu": "P.KTM",
  //     "Code HS": "8803",
  //     "Article/Nom affiché": "UNK20233 - blouse coffe - 8803 [VF83487]",
  //     "Article/Description": "blouse coffe - f704.unkvf.8803",
  //     "Article/Catégorie du point de vente": "P.Femme - Vetements",
  //     "Article/Catégorie d'article": "Blouse",
  //     "Quantité disponible": 1,
  //     "PV": 35,
  //     "status": false,
  //     "sellStatus": false
  // }
  let height = 0
    autoTable(pdf, {
      head: [["#", 'Code HS', 'Code barre', 'Nom de produit', 'QD', "Qté", "PV"]],
      body: mInternesNotSelled.reduce((acc: string[], m: any, index: number) => {
        return [
          ...acc, [
            index+1, m["Code HS"], m["Article/Code barre"], m["Article/Nom affiché"], 
            m["Quantité disponible"], m["Quantité disponible"], m["PV"]
          ]
        ]
      }, []),
      startY: 100,
      headStyles: {
        fillColor: "white", textColor: "black"
      },
    })

    // bas de page
    // pdf.setFontSize(12)
    // pdf.setFont('Arial', 'normal');
    // pdf.setTextColor(0,0,0);
    // pdf.text("Ces informations sont tirées du comptage physique relatif à la mission indiqué en haut de page", 12, 225)
    // pdf.text("Fait à Kinshasa", pageWidth - 60, 240)
    // pdf.text("Copie pour Réception : ", 12, 255)
    // pdf.text("Manager de Boutique :", 12, 260)
    

    // pdf.setFont('Newsreader');
    // const itemDetailsYStart = 88;
    // pdf.autoTable({
    //     head: [itemDetailsHeaders],
    //     body: itemDetailsRows,
    //     startY: itemDetailsYStart, // Adjust the Y position as needed
    //     headStyles: {
    //         fillColor: headerStyles.fillColor,
    //         textColor: headerStyles.textColor,
    //         fontStyle: headerStyles.fontStyle,
    //         fontSize: 10, // Adjust the font size as needed
    //         font: 'Newsreader', // Set the font family
    //         halign: 'left',
    //     },
    //     columnStyles: {
    //         0: { cellWidth: columnWidths[0] }, // Adjust column widths as needed
    //         1: { cellWidth: columnWidths[1] },
    //         2: { cellWidth: columnWidths[2] },
    //         3: { cellWidth: columnWidths[3] },
    //         4: { cellWidth: columnWidths[4] },
    //     },
    //     alternateRowStyles: { fillColor: [255, 255, 255] },
    //     bodyStyles: {
    //         fontSize: 10, // Adjust the font size for the body
    //         font: 'Newsreader', // Set the font family for the body
    //         cellPadding: { top: 1, right: 5, bottom: 1, left: 2 }, // Adjust cell padding
    //         textColor: [0, 0, 0], // Set text color for the body
    //         rowPageBreak: 'avoid', // Avoid row page breaks
    //     },
    //     margin: { top: 10, left: 13 },
    // });

    // Add summary and page numbers
    // const summaryYStart = pdf.internal.pageSize.getHeight() - 50;

    // pdf.setFont('Newsreader', 'noraml')
    // pdf.text('Thanking You,', 13, summaryYStart + 20)
    // pdf.text('Yours Faithfully,', 13, summaryYStart + 24)
    // pdf.text('For ', 13, summaryYStart + 28)
    // pdf.setFont('Newsreader', 'bold')
    // pdf.text('Aalam Info Solutions LLP', 19, summaryYStart + 28)

    // const totalPages = pdf.internal.getNumberOfPages();
    // for (let i = 1; i <= totalPages; i++) {
    //     pdf.line(10, 283, 200, 283)
    //     pdf.setPage(i);
    //     pdf.setFont('Newsreader');
    //     pdf.text(
    //         `Page ${i} of ${totalPages}`,
    //         185,
    //         pdf.internal.pageSize.getHeight() - 5
    //     );
    // }

    // Save the PDF 
    pdf.save(`Tableau de Résultat ${audit.name}.pdf`);

    // pdf open in a new tab
    const pdfDataUri = pdf.output('datauristring');
    const newTab = window.open();
    newTab?.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);

}

export default ReportDetailsAudit