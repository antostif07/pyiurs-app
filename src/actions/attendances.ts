'use server'
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { Attendance } from '../ui/attendances/Attendance';

export const getAttendances = async (searchParams?: string) => {
  const res = await fetch(`${process.env.API_URL}/attendances?${searchParams}`, {
    headers: {
      "content-type": "application/ld+json"
    },
    next: {revalidate: 5, tags: ["attendances"]}
  })

  return res.json()
}

export const updateAttendance = async (attendance: Attendance, id: any, options?: {redirectLink?: string}) => {
  const res = await fetch(
    `${process.env.API_URL}/attendances/${id}`,
    {
      method: "PATCH", 
      headers: {
        "content-type": "application/merge-patch+json"
      },
      body: JSON.stringify(attendance),
      cache: 'no-cache'
    }
  )
  
  const r = await res.json()
  
  if(options && options.redirectLink) {
    revalidatePath(options.redirectLink)
    revalidateTag("attendances")
  }
}

export const saveAttend = async (attendance: {attendanceDateTime: string, date_id: string, employee: string, status: string}) => {
  console.log(attendance);

  const res = await fetch(
    `${process.env.API_URL}/attendances`,
    {
      method: "POST", 
      headers: {
        "content-type": "application/ld+json"
      },
      body: JSON.stringify(attendance)
    }
  )
  
  const result = await res.json()

  console.log(result);
  

  revalidatePath('/rh/attendances')

  return result
}

// export default async function addAttendances(attendances: Array<{
//   name: string, id: string, employeeId?: string, 
//   dateandtime: Array<{date: string, day: string, time?: string, status: string}>
// }>) {
//   console.log(attendances)
//   // Create form
//   const form: Array<any> = []

//   attendances.forEach((attendance) => {
//     if(attendance.employeeId) {
//       attendance.dateandtime.forEach((dt) => {
//         if(parseInt(dt.day) !== 7) {
//           const d = dt.date.split("/")
//           const date_time = dt.time ? `${d[2]}-${d[1]}-${d[0]}T${dt.time}` : `${d[2]}-${d[1]}-${d[0]}T00:00`
  
//           form.push({
//             attendanceDateTime: date_time, 
//             date_id: `${d[2]}${d[1]}${d[0]}`,
//             employee: attendance.employeeId,
//             status: dt.status
//           })
//         }
//       })
//     }
//   })

//   const setAttendances = async () => {
//     const promises = form.map(saveAttend)
//     const result = await Promise.all(promises)

//     return result
//   }

//   const res = await setAttendances()

//   revalidatePath('/rh/attendances')
//   redirect('/rh/attendances')
// }