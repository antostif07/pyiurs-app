'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {z} from 'zod'
import {getSession} from "@/src/actions/auth";

const FormSchema = z.object({
  name: z.string(),
});

const CreateAssignment = FormSchema.omit({});

export default async function addAssignment(formData: FormData) {
  const {name} = CreateAssignment.parse({
    name: formData.get('name')
  })
  const rawData = {
    name: name
  }

  const session = await getSession()
  const res = await fetch(`${process.env.API_URL}/assignments`, {
    method: "POST", 
    headers: {
      "content-type": "application/ld+json",
      "Authorization": `Bearer ${session.token}`
    },
    body: JSON.stringify(rawData)
  })

  const result = await res.json()

  revalidatePath('/rh/assignments')
  redirect('/rh/assignments')
  
  return result
}