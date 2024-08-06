import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { Employee } from '@/src/common/Employee';

interface IBulletinPaie {
    period: {from: string, to: string};
    employee: Employee, nbr_presents: number, ratio_sal: number, nbr_absences: number, r_absences: number,
}
// Define the PdfGenerator component
const BulletinPaie = (props: IBulletinPaie) => {
    const {period, employee, nbr_presents, ratio_sal, nbr_absences, r_absences} = props

    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Set document properties
    pdf.setProperties({
        title: "Bulletin de Paie"
    })

    const pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();

    // Add images and text to the PDF
    const callImage = new Image()
    callImage.src = "/images/logo-pyiurs.png"
    
    pdf.addImage(callImage, "PNG", 8, 4, 60, 20)
    pdf.setFontSize(16);
    pdf.setFont('custom', 'bold');
    pdf.text('Pyiurs Boutiques', 150, 12);

    pdf.setFontSize(10)
    pdf.setFont('custom', 'normal');
    pdf.text("Av. Colonel Mpia, 37A - Kinshasa/Ngaliema - Id.Nat. 01-G4701-N39612B - RCCM: CD/KNG/RCCM/18-A-04301", pageWidth / 2, pageHeight -270, {align: "center"})

    // Line color (RGB)
    pdf.setLineWidth(0.1)
    pdf.setDrawColor(200, 200, 200);
    pdf.line(10, 29, 200, 29)
    
    // Title
    pdf.setFontSize(18)
    pdf.setFont('custom', 'bold');
    pdf.setTextColor(241,19,145);
    pdf.text("Bulletin de Paie", pageWidth / 2, pageHeight - 260, {align: "center"})

    // Periode
    pdf.setFontSize(12)
    pdf.setFont('custom', 'bold');
    pdf.setTextColor(241,19,145);
    pdf.text(`Période: ${period.from} Au ${period.to}`, pageWidth / 2, pageHeight - 255, {align: "center"})

    //Nom
    pdf.setTextColor(0,0,0);
    pdf.text('Nom', 12, 50)
    pdf.setFont('custom', 'normal')
    pdf.text(employee.name, 50, 50)

    // Telephone Prive
    pdf.setTextColor(0,0,0);
    pdf.setFont('custom', 'bold')
    pdf.text('Tel. Prive', 112, 50)
    pdf.setFont('custom', 'normal')
    pdf.text(`${employee.tel}`, 150, 50)
    
    // Salaire de base
    pdf.setFont('custom', 'bold')
    pdf.text('Salaire de Base', 12, 55)
    pdf.setFont('custom', 'normal')
    pdf.text(`${employee.salary} $`, 50, 55)

    // Matricule
    pdf.setFont('custom', 'bold')
    pdf.text('Matricule', 112, 55)
    pdf.setFont('custom', 'normal')
    pdf.text(`${employee.matricule} $`, 150, 55)

    // Ratio Jour
    pdf.setFont('custom', 'bold')
    pdf.text('Jours de travail', 12, 60)
    pdf.setFont('custom', 'normal')
    pdf.text(`${employee.total_days}`, 50, 60)

    // Fonction
    pdf.setFont('custom', 'bold')
    pdf.text('Fonction', 112, 60)
    pdf.setFont('custom', 'normal')
    pdf.text(`${employee.employee_function}`, 150, 60)

    // Date d'embauche
    pdf.setFont('custom', 'bold')
    pdf.text("Date d'embauche", 12, 65)
    pdf.setFont('custom', 'normal')
    pdf.text(`${employee.start_date}`, 50, 65)

    // Date d'embauche
    pdf.setFont('custom', 'bold')
    pdf.text("Departement", 112, 65)
    pdf.setFont('custom', 'normal')
    pdf.text(`${employee.department}`, 150, 65)

    // Email
    pdf.setFont('custom', 'bold')
    pdf.text("Email", 12, 70)
    pdf.setFont('custom', 'normal')
    pdf.text(`${employee.email}`, 50, 70)

    // Statut
    pdf.setFont('custom', 'bold')
    pdf.text("Statut", 112, 70)
    pdf.setFont('custom', 'normal')
    pdf.text(`${employee.job_status}`, 150, 70)

    // Affectation
    pdf.setFont('custom', 'bold')
    pdf.text("Affectation", 12, 75)
    pdf.setFont('custom', 'normal')
    pdf.text(`${employee.assignment.name}`, 50, 75)

    autoTable(pdf, {
        head: [['Présence', 'Taux', 'Libellé', 'Gains', 'Retenues']],
        body: [
          ['Présence', nbr_presents, 'Salaire Mensuel', `+${(ratio_sal * nbr_presents).toFixed(2)}$`],
          ['Absence', nbr_absences, 'Ret. produit', "", `-${r_absences.toFixed(2)}$`],
          ['Malade', nbr_absences, 'Ret. produit', "", ""],
          ['Sanction', nbr_absences, 'Ret. de la dette', "", ""],
          ['Conge Circ', nbr_absences, 'Ret. produit', "", ""],
          [' Conge Circ. Non payé', nbr_absences, 'Remboursement d’argent ', "",""],
          [],
          ["", "", "Total Intermédiaire :", `+${(ratio_sal * nbr_presents).toFixed(2)}$`, `-${r_absences.toFixed(2)}$`]
        ],
        startY: 80
      })
    // Generate AutoTable for item details
    // const itemDetailsRows = itemsData?.map((item, index) => [
    //     (index + 1).toString(),
    //     item.itemName.toString(),
    //     item.quantity?.toString(),
    //     item.uom?.toString(),
    //     item.total?.toLocaleString(),
    // ]);
    // const itemDetailsHeaders = ['S.No', 'Item Name', 'Quantity', 'UOM', 'Total'];
    // const columnWidths = [15, 90, 30, 30, 23]; // Adjust column widths as needed
    // Define table styles
    // const headerStyles = {
    //     fillColor: [240, 240, 240],
    //     textColor: [0],
    //     fontFamily: 'Newsreader',
    //     fontStyle: 'bold',
    // };

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
    pdf.save(`Bulletin de Paie - ${employee.name} - ${period.from} au ${period.to}.pdf`);

    // pdf open in a new tab
    const pdfDataUri = pdf.output('datauristring');
    const newTab = window.open();
    newTab?.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);

}

export default BulletinPaie