import { format } from 'date-fns';
import * as XLSX from 'xlsx'
import getTimeStatus from './getTimeStatus';

export const parseExcelLogs = (excelData: XLSX.WorkSheet) => {
    const jsonData = XLSX.utils.sheet_to_csv(excelData, { blankrows: true})
    const logs = jsonData.split('\n');

    const rowsExcel = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "AA", "AB", "AC", "AD", "AE"]

    const attendanceData: [] = [];

    console.log(excelData);
    
    const selectedDate = logs[3].split(',').filter(d => d !== "") // Returns selected dates
    const periods = logs[2].split(",")[2].slice(0, 7).split("/"); // Returns period on format 2024/04
    const period = `${periods[1]}/${periods[0]}`
    
    let currentEmployee = null;
    let currentEmployeeIndexLog = null;

    logs.forEach((line, index) => {
        line = line.trim(); // Remove leading/trailing spaces
        if (line.startsWith('No :')) {
          currentEmployeeIndexLog = index;
          currentEmployee = {
            name: line.split(',')[10],
            id: currentEmployeeIndexLog,
            dateandtime: []
          };
          // @ts-ignore
          attendanceData.push(currentEmployee)
        }
      });

      let excelHourIndexRow = 6
      const finalData = attendanceData.map((d) => {
        // @ts-ignore
        const dateandtime = []

        selectedDate.forEach((day, index) => {
            const theDay = format(new Date(parseInt(period.split('/')[1]), parseInt(period.split('/')[0]) - 1, parseInt(day)), "i")
            const time = excelData[`${rowsExcel[index]}${excelHourIndexRow}`] ? excelData[`${rowsExcel[index]}${excelHourIndexRow}`].v : null

            dateandtime.push(
              {
                date: `${day}/${period}`,
                time: time?.substring(0,5)
                ?  
                  (excelData[`${rowsExcel[index]}${excelHourIndexRow}`].v)?.substring(0,5)
                : null,
                day: theDay,
                status: parseInt(theDay) === 7 ? "Dimanche" : getTimeStatus(time?.substring(0,5))
              }
            )
        })
        excelHourIndexRow = excelHourIndexRow + 3

        // @ts-ignore
        return {...d, dateandtime: dateandtime}
      })

      const fdata = finalData.filter(eD => !(eD.dateandtime.every((e: any) => !e.time)))
      
      return fdata
}