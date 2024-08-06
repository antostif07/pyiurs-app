'use server'
import { Attendance } from '@/src/common/Attendance';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const updateAttendance = async (attendance: Attendance, id: any) => {
  let mediaFileId;

  if(attendance.mediaFile) {
    const result = await saveMediaAttendance(attendance.mediaFile)

    mediaFileId = result["@id"]
  }
  
  delete attendance.mediaFile

  const body = mediaFileId ? {...attendance, mediaFile: mediaFileId} : attendance
  
  const res = await fetch(
    `${process.env.API_URL}/attendances/${id}`,
    {
      method: "PATCH", 
      headers: {
        "content-type": "application/merge-patch+json"
      },
      body: JSON.stringify(body)
    }
  )
  
  revalidatePath('/pyiurs/rh/attendances')
  redirect('/pyiurs/rh/attendances')
}

const saveMediaAttendance = async (body: any) => {
  const res = await fetch(
    `${process.env.API_URL}/media_objects`,
    {
      method: "POST",
      body: body
    }
  )

  const result = await res.json()
  
  return result
}

const saveAttend = async (attendance: {attendanceDateTime: string, date_id: string, employee: string, status: string}) => {
  const res = await fetch(
    `${process.env.API_URL}/attendances`,
    {
      method: "POST", 
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(attendance)
    }
  )

  const result = await res.json()
}

export default async function addAttendances(attendances: Array<{
  name: string, id: string, employeeId?: string, 
  dateandtime: Array<{date: string, day: string, time?: string, status: string}>
}>) {
  console.log(attendances)
  // Create form
  const form: Array<any> = []

  attendances.forEach((attendance) => {
    if(attendance.employeeId) {
      attendance.dateandtime.forEach((dt) => {
        if(parseInt(dt.day) !== 7) {
          const d = dt.date.split("/")
          const date_time = dt.time ? `${d[2]}-${d[1]}-${d[0]}T${dt.time}` : `${d[2]}-${d[1]}-${d[0]}T00:00`
  
          form.push({
            attendanceDateTime: date_time, 
            date_id: `${d[2]}${d[1]}${d[0]}`,
            employee: attendance.employeeId,
            status: dt.status
          })
        }
      })
    }
  })

  const setAttendances = async () => {
    const promises = form.map(saveAttend)
    const result = await Promise.all(promises)

    return result
  }

  const res = await setAttendances()

  revalidatePath('/pyiurs/rh/attendances')
  redirect('/pyiurs/rh/attendances')
}