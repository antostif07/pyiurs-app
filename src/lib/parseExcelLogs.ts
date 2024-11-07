import {format} from 'date-fns';
import * as XLSX from 'xlsx'
import getTimeStatus from './getTimeStatus';
import {convertirEnHeureMinute} from './convertTime';

export const parseExcelLogs = (excelData: XLSX.WorkSheet) => {
    const jsonData = XLSX.utils.sheet_to_csv(excelData, { blankrows: true})
    const logs = jsonData.split('\n');

    const rowsExcel = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "AA", "AB", "AC", "AD", "AE"]

    const attendanceData: [] = [];
    
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
            dateAndTime: []
          };
          // @ts-ignore
          attendanceData.push(currentEmployee)
        }
      });

      let excelHourIndexRow = 6
      const finalData = attendanceData.map((d) => {
        // @ts-ignore
        const dateAndTime = []

        selectedDate.forEach((day, index) => {
            const theDay = format(new Date(parseInt(period.split('/')[1]), parseInt(period.split('/')[0]) - 1, parseInt(day)), "i")
            const time: string|null = excelData[`${rowsExcel[index]}${excelHourIndexRow}`] ? excelData[`${rowsExcel[index]}${excelHourIndexRow}`].v : null

            const realTime = time !== null ? convertirEnHeureMinute(time) : null

            dateAndTime.push(
              {
                date: `${day}/${period}`,
                time: realTime
                ?  
                  (realTime)
                : null,
                day: theDay,
                status: parseInt(theDay) === 7 ? "Dimanche" : getTimeStatus(realTime)
              }
            )
        })
        excelHourIndexRow = excelHourIndexRow + 3

        // @ts-ignore
        return {...d, dateAndTime: dateAndTime}
      })

    return finalData.filter(eD => !(eD.dateAndTime.every((e: any) => !e.time)))
}