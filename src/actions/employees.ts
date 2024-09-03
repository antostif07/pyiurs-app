'use server'
import { format } from 'date-fns';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import {number, z} from 'zod'
import { parseFormData } from '../lib/parseFormData';

const FormSchema = z.object({
  name: z.string(),
  assignment: z.string(),
  salary: z.number(),
  transportFee: z.number(),
  total_days: z.number(),
  start_date: z.string(),
  employee_function: z.string(),
  team: z.string(),
  department: z.string(),
  address: z.string(),
  job_status: z.string(),
  matricule: z.string(),
  email: z.string().optional(),
  tel: z.string().optional(),
  indemnityKm: z.number(),
});

const CreateEmployee = FormSchema.omit({});

export default async function addEmployee(formData: FormData, options?: {redirectLink?: string}) {
  const parsedData = await parseFormData(formData);
  
  const form = CreateEmployee.safeParse(parsedData)
  
  if(form.error) {
    console.log(form.error);
    return
  }

  const rawData = {
    ...form.data, start_date: format(form.data.start_date, "yyyy-MM-dd",)
  }
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`, {
    method: "POST", 
    headers: {
      "content-type": "application/ld+json"
    },
    body: JSON.stringify(rawData)
  })
  
  const r = await res.json()

  console.log(r);
  
  if(r.status && r.status !== 201) {
    console.log(r.status, r.detail)
  } else {
    if(options && options.redirectLink) {
      revalidatePath(options.redirectLink)
      revalidateTag("employees")
      
      return r
    }
  }
}

export const updateEmployee = async (formData: FormData, id: string | number, options?: {redirectLink?: string}) => {
  const parsedData = await parseFormData(formData);
  
  const form = CreateEmployee.safeParse(parsedData)

  if(form.error) {
    console.log(form.error);
    return
  }

  const rawData = {
    ...form.data, start_date: format(form.data.start_date, "yyyy-MM-dd",)
  }
  
  const res = await fetch(
    `${process.env.API_URL}/employees/${id}`,
    {
      method: "PATCH", 
      headers: {
        "content-type": "application/merge-patch+json"
      },
      body: JSON.stringify(rawData)
    }
  )
  
  const r = await res.json()
  
  if(r.status && r.status === 422) {
    console.log(rawData);
    
    console.log(r.violations);
  } else {
    if(options && options.redirectLink) {
      revalidatePath(options.redirectLink)
      revalidateTag("employees")
      
      return r
    }
  }
}