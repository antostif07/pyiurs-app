'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {z} from 'zod'
import { format } from 'date-fns';
import { Audit } from '@/src/common/Audit';
// import { saveMediaObject } from './mediaObjet';
// import dataToFormData from '@/lib/dataToFormData';

const FormSchema = z.object({
    name: z.string(),
    assignment: z.string(),
    segment: z.string(),
    categories: z.string(),
    start_date: z.string(),
    baseFile: z.string(), totalBaseFile: z.string()
  })

const CreateAudit = FormSchema.omit({});

export const updateAudit = async (body: Audit, id: any, params?: {redirectLink?: string}) => {
  const res = await fetch(
    `${process.env.API_URL}/audits/${id}`,
    {
      method: "PATCH", 
      headers: {
        "content-type": "application/merge-patch+json"
      },
      body: JSON.stringify(body)
    }
  )

  const r = await res.json()
  
  if(params && params.redirectLink) {
    revalidatePath(params.redirectLink)
    redirect(params.redirectLink)
  } else {
    return r;
  }
}

export default async function createAudit(formData: FormData, params?: {redirectLink?: string}) {
  const {name, assignment, segment, categories, start_date, baseFile, totalBaseFile} = CreateAudit.parse({
    name: formData.get('name'),
    assignment: formData.get('assignment'),
    segment: formData.get('segment'),
    categories: formData.get('categories'),
    start_date: formData.get('start_date'),
    baseFile: formData.get('baseFile'),
    totalBaseFile: formData.get('totalBaseFile'),
  })
  
  const rawData = {
    name: name, assignment: assignment, segment: segment, categories: categories, start_date: format(start_date, "yyyy-MM-dd"), 
    baseFile: baseFile, totalBaseFile: totalBaseFile
  }

  const res = await fetch(`${process.env.API_URL}/audits`, {
    method: "POST", 
    headers: {
      "content-type": "application/ld+json"
    },
    body: JSON.stringify(rawData)
  })

  const result = await res.json()

  if(params && params.redirectLink) {
    revalidatePath(params.redirectLink)
    redirect(params.redirectLink)
  } else {
    return result;
  }
}