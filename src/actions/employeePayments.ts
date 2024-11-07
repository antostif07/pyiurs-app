'use server'
import {revalidatePath} from 'next/cache';
import {z} from 'zod'
import {parseFormData} from '../lib/parseFormData';
import {getSession} from "@/src/actions/auth";

const FormSchema = z.object({
  employee: z.string(),
  remCC: z.number(),
  remMalade: z.number(),
  month: z.string(),
  retR1: z.number(),
  retRetR1: z.number(),
  retR2: z.number(),
  retRetR2: z.number(),
  absence: z.number(),
  retAbsence: z.number(),
  totalRet: z.number(),
  totalPay: z.number(),
  nap: z.number(),
  transportAbs: z.number(),
  malade: z.number(),
  retMalade: z.number(),
  transportMalade: z.number(),
  cCirc: z.number(),
  retCCirc: z.number(),
  transportCCirc: z.number(),
  cCircNP: z.number(),
  retCCircNP: z.number(),
  transportCCircNP: z.number(),
  suspension: z.number(),
  retSuspension: z.number(),
  transportSuspension: z.number(),
});

const CreateEmployeePayment = FormSchema.omit({});

export default async function addEmployeePayment(formData: FormData) {
  const session = await getSession()

  const parsedData = await parseFormData(formData);

  const form = CreateEmployeePayment.safeParse(parsedData)
  
  const rawData = {
    ...form.data,
  }
  
  const res = await fetch(`${process.env.API_URL}/employee_payments`, {
    method: "POST", 
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${session.token}`
    },
    body: JSON.stringify(rawData)
  })

  revalidatePath('/rh/pay-slips')

  return await res.json()
}