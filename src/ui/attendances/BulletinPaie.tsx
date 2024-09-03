import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { Employee } from '../employees/Employee';
import { IEmployeePayment } from '@/src/types/IEmployeePayment';

interface IBulletinPaie {
    employeePayment: IEmployeePayment
}
// Define the PdfGenerator component
const BulletinPaie = (props: IBulletinPaie) => {
    const {employeePayment} = props

    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Set document properties
    pdf.setProperties({
        title: `Bulletin de Paie -  ${employeePayment.employee.name} - ${employeePayment.month}`
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
    pdf.setFont('Helvetica', 'normal');
    pdf.text("Av. Colonel Mpia, 37A - Kinshasa/Ngaliema - Id.Nat. 01-G4701-N39612B - RCCM: CD/KNG/RCCM/18-A-04301", pageWidth / 2, pageHeight -270, {align: "center"})

    // Line color (RGB)
    pdf.setLineWidth(0.1)
    pdf.setDrawColor(200, 200, 200);
    pdf.line(10, 29, 200, 29)
    
    // Title
    pdf.setFontSize(18)
    pdf.setFont('Helvetica', 'bold');
    pdf.setTextColor(241,19,145);
    pdf.text("Bulletin de Paie", pageWidth / 2, pageHeight - 260, {align: "center"})

    // Periode
    pdf.setFontSize(12)
    pdf.setFont('Helvetica', 'bold');
    pdf.setTextColor(241,19,145);
    pdf.text(`Période: ${employeePayment.month}`, pageWidth / 2, pageHeight - 255, {align: "center"})

    //Nom
    pdf.setFontSize(9)
    pdf.setTextColor(0,0,0);
    pdf.text('Nom', 12, 50)
    pdf.text(employeePayment.employee.name, 50, 50)

    // Telephone Prive
    pdf.setTextColor(0,0,0);
    pdf.setFont('Helvetica', 'bold')
    pdf.text('Tel. Prive', 112, 50)
    pdf.setFont('custom', 'normal')
    pdf.text(`${employeePayment.employee.tel}`, 150, 50)
    
    // Salaire de base
    pdf.setFont('Helvetica', 'bold')
    pdf.text('Salaire de Base', 12, 55)
    pdf.setFont('custom', 'normal')
    pdf.text(`${employeePayment.employee.salary} $`, 50, 55)

    // Matricule
    pdf.setFont('Helvetica', 'bold')
    pdf.text('Matricule', 112, 55)
    pdf.setFont('custom', 'normal')
    pdf.text(`${employeePayment.employee.matricule} $`, 150, 55)

    // Ratio Jour
    pdf.setFont('Helvetica', 'bold')
    pdf.text('Jours de travail', 12, 60)
    pdf.setFont('Helvetica', 'normal')
    pdf.text(`${employeePayment.employee.total_days}`, 50, 60)

    // Fonction
    pdf.setFont('Helvetica', 'bold')
    pdf.text('Fonction', 112, 60)
    pdf.setFont('Helvetica', 'normal')
    pdf.text(`${employeePayment.employee.employee_function}`, 150, 60)

    // Date d'embauche
    pdf.setFont('Helvetica', 'bold')
    pdf.text("Date d'embauche", 12, 65)
    pdf.setFont('Helvetica', 'normal')
    pdf.text(`${employeePayment.employee.start_date ? format(employeePayment.employee.start_date, "dd MMM yyyy") : ""}`, 50, 65)

    // Date d'embauche
    pdf.setFont('Helvetica', 'bold')
    pdf.text("Departement", 112, 65)
    pdf.setFont('Helvetica', 'normal')
    pdf.text(`${employeePayment.employee.department}`, 150, 65)

    // Email
    pdf.setFont('Helvetica', 'bold')
    pdf.text("Email", 12, 70)
    pdf.setFont('Helvetica', 'normal')
    pdf.text(`${employeePayment.employee.email}`, 50, 70)

    // Statut
    pdf.setFont('Helvetica', 'bold')
    pdf.text("Statut", 112, 70)
    pdf.setFont('Helvetica', 'normal')
    pdf.text(`${employeePayment.employee.job_status}`, 150, 70)

    // Affectation
    pdf.setFont('Helvetica', 'bold')
    pdf.text("Affectation", 12, 75)
    pdf.setFont('Helvetica', 'normal')
    pdf.text(`${employeePayment.employee.assignment.name}`, 50, 75)

    const ratio_sal = employeePayment.employee.salary / employeePayment.employee.total_days
    const nbr_presents = employeePayment.employee.total_days - employeePayment.absence

    const totalRet = employeePayment.retMalade + employeePayment.retSuspension + employeePayment.retCCirc + employeePayment.retCCircNP +
    (employeePayment.totalPaidDebts ?? 0) + employeePayment.retRetR1 + employeePayment.retRetR2 + 
    employeePayment.transportAbs +
    employeePayment.transportCCirc + employeePayment.transportCCircNP + 
    employeePayment.transportMalade + employeePayment.transportSuspension

    const nap = (ratio_sal * nbr_presents) - totalRet + employeePayment.remCC + employeePayment.remMalade + employeePayment.prime
    
    autoTable(pdf, {
        theme: "grid",
        head: [['Présence', 'Taux', 'Libellé', 'Gains', 'Retenues']],
        body: [
          ['Présence', nbr_presents, 'Salaire Mensuel', `+${(ratio_sal * nbr_presents).toFixed(2)} $`],
          ['Absence', employeePayment.absence, '', "", ``],
          ['Malade', employeePayment.malade, '', "", `- ${(employeePayment.retMalade).toFixed(2)} $`],
          ['Sanction', employeePayment.suspension, '', "", `- ${(employeePayment.retSuspension).toFixed(2)} $`],
          ['Conge Circ', employeePayment.cCirc, '', "", `- ${(employeePayment.retCCirc).toFixed(2)} $`],
          ['Conge Circ. Non payé', employeePayment.cCircNP, '', "",`${(employeePayment.retCCircNP).toFixed(2)} $`],
          [{ content: "", colSpan: 2, styles: { lineWidth: {left: 0}}}, "Ret. Dettes", "", `- ${employeePayment.totalPaidDebts} $`],
          [{ content: "", colSpan: 2, styles: { lineWidth: {left: 0, top: 0, bottom: 0}}}, `Retenue Retard-1 (${employeePayment.retR1} jrs)`, "", `- ${employeePayment.retRetR1} $`],
          [{ content: "", colSpan: 2, styles: { lineWidth: {left: 0, top: 0, bottom: 0}}}, `Retenue Retard-2 (${employeePayment.retR2} jrs)`, "", `- ${employeePayment.retRetR2} $`],
          [{ content: "", colSpan: 2, styles: { lineWidth: {left: 0, top: 0, bottom: 0}}}, `Retenue transport pr absence (${employeePayment.absence} jrs)`, "", `- ${employeePayment.transportAbs} $`],
          [{ content: "", colSpan: 2, styles: { lineWidth: {left: 0, top: 0, bottom: 0}}}, `Retenue transport pr malade (${employeePayment.malade} jrs)`, "", `- ${employeePayment.transportMalade} $`],
          [{ content: "", colSpan: 2, styles: { lineWidth: {left: 0, top: 0, bottom: 0}}}, `Retenue transport pr Congé Circ. (${employeePayment.cCirc} jrs)`, "", `- ${employeePayment.transportCCirc} $`],
          [{ content: "", colSpan: 2, styles: { lineWidth: {left: 0, top: 0, bottom: 0}}}, `Retenue transport pr Congé Circ. Non Payé (${employeePayment.cCirc} jrs)`, "", `- ${employeePayment.transportCCircNP} $`],
          [{ content: "", colSpan: 2, styles: { lineWidth: {left: 0, top: 0, bottom: 0}}}, `Retenue transport pr le jr de suspension (${employeePayment.suspension} jrs)`, "", `- ${employeePayment.transportSuspension} $`],
          [{ content: "", colSpan: 2, styles: {lineWidth: {left: 0, top: 0, bottom: 0}}},{ content: "", colSpan: 3, styles: {fillColor: [175, 175, 175]}}],
          [
            { content: "", colSpan: 2, styles: { lineWidth: {left: 0, top: 0, bottom: 0}}}, 
            `Total Intermédiaire :`, `+${(ratio_sal * nbr_presents).toFixed(2)} $`, `- ${totalRet.toFixed(2)} $`
          ],
          [
            { content: "", colSpan: 2, styles: { lineWidth: {left: 0, top: 0, bottom: 0}}}, 
            `Net Intermédiaire :`, {colSpan: 2, content: `+ ${((ratio_sal * nbr_presents) - totalRet).toFixed(2)} $`, styles: {fontStyle: "bold"}}
          ],
          [
            { content: "", colSpan: 2, styles: { lineWidth: {left: 0, top: 0, bottom: 0}}}, 
            `Prime :`, {colSpan: 2, content: `+ ${employeePayment.prime.toFixed(2)} $`, styles: {fontStyle: "bold"}}
          ],
          [
            { content: "", colSpan: 2, styles: { lineWidth: {left: 0, top: 0, bottom: 0}}}, 
            `(+) 30% jr de maladie ( jr) :`, {colSpan: 2, content: `+ ${employeePayment.remMalade.toFixed(2)} $`, styles: {fontStyle: "bold"}}
          ],
          [
            { content: "", colSpan: 2, styles: { lineWidth: {left: 0, top: 0, bottom: 0}}}, 
            `(+) 70% Conge.Circonst. ( jr) :`, {colSpan: 2, content: `+ ${employeePayment.remCC.toFixed(2)} $`, styles: {fontStyle: "bold"}}
          ],
          [
            { content: "", colSpan: 2, styles: { lineWidth: {left: 0, top: 0, bottom: 0}}}, 
            `(+) Heure Supplémentaire :`, {colSpan: 2, content: `+ 0 $`, styles: {fontStyle: "bold"}}
          ],
          [
            { content: "", colSpan: 3, styles: { lineWidth: {left: 0, bottom: 0}}}, 
            `Net à Payer (USD) :`, 
            {
              content: `${nap.toFixed(2)} $`,
              styles: { fontStyle: "bold"}
            }
          ],
          [
            { content: "", colSpan: 3, styles: { lineWidth: {left: 0, bottom: 0}}}, 
            `Transport (USD) :`, 
            {
              content: `${employeePayment.employee.transportFee.toFixed(2)} $`,
              styles: { fontStyle: "bold"}
            }
          ],
          [
            { content: "", colSpan: 3, styles: { lineWidth: {left: 0, bottom: 0}}}, 
            `Indemnité Kilométrage  (USD) :`, 
            {
              content: `${(employeePayment.employee.indemnityKm ?? 0).toFixed(2)} $`,
              styles: { fontStyle: "bold"}
            }
          ],
          [
            { content: "", colSpan: 3, styles: { lineWidth: {left: 0, bottom: 0}}}, 
            `Net à payer Transport  (USD) :`, 
            {
              content: `${(employeePayment.employee.transportFee + (employeePayment.employee.indemnityKm ?? 0)).toFixed(2)} $`,
              styles: { fontStyle: "bold"}
            }
          ],
          [
            { content: "", colSpan: 3, styles: { lineWidth: {left: 0, bottom: 0}}}, 
            `MONTANT GLOBAL PAYER `, 
            {
              content: `${(nap + employeePayment.employee.transportFee + (employeePayment.employee.indemnityKm ?? 0)).toFixed(2)} $`,
              styles: { fontStyle: "bold", fontSize: 10}
            }
          ],
          [{ content: "", colSpan: 3, styles: { lineWidth: {left: 0, bottom: 0}}}, `Pour Acquis`, ""],
        ],
        startY: 80,
        styles: {
          lineColor: [0,0,0], fontSize: 8
        }
      })

    // Save the PDF 
    // ${employee.name} - ${period.from} au ${period.to}
    // pdf.save(`Bulletin de Paie - ${employeePayment.employee.name} - ${employeePayment.month}.pdf`);

    // pdf open in a new tab
    const pdfDataUri = pdf.output('datauristring');
    const newTab = window.open();
    newTab?.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);

}

export default BulletinPaie