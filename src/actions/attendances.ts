'use server'
import { revalidatePath, revalidateTag } from 'next/cache';
import { Attendance } from '../ui/attendances/Attendance';
import {getSession} from "@/src/actions/auth";

export const updateAttendance = async (attendance: Attendance, id: any, options?: {redirectLink?: string}) => {
    const session = await getSession()

    const res = await fetch(
        `${process.env.API_URL}/attendances/${id}`,
        {
            method: "PATCH",
            headers: {
                "content-type": "application/merge-patch+json",
                "Authorization": `Bearer ${session.token}`
            },
            body: JSON.stringify(attendance),
            cache: 'no-cache'
        })
    await res.json()

    if(options && options.redirectLink) {
        revalidatePath("/attendances")
    }
}

export const saveAttend = async (attendance: {attendanceDateTime: string, date_id: string, employee: string, status: string}) => {
    const session = await getSession()

    const res = await fetch(
    `${process.env.API_URL}/attendances`,
    {
      method: "POST", 
      headers: {
          "content-type": "application/ld+json",
          "Authorization": `Bearer ${session.token}`
      },
      body: JSON.stringify(attendance)
    }
  )

  const result = await res.json()

  revalidateTag('attendances')

  return result
}