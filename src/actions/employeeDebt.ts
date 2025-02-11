import {z} from "zod";
import {parseFormData} from "../lib/parseFormData";
import {getSession} from "@/src/actions/auth";

const FormSchema = z.object({
  description: z.string(),
  amount: z.string(),
  employee: z.string(),
});

const FormEmployeeDebtPaymentSchema = z.object({
  employeeDebt: z.string(),
  amount: z.number(),
  employeePayment: z.string(),
});
  
const CreateEmployeeDebt = FormSchema.omit({});
const CreateEmployeeDebtPayment = FormEmployeeDebtPaymentSchema.omit({});
  
export default async function addEmployeeDebt(formData: FormData) {
  const {
    description, amount, employee
  } = CreateEmployeeDebt.parse({
    description: formData.get('description'),
    amount: formData.get('amount'),
    employee: formData.get('employee'),
  })

  const rawData = {
    description: description,
    amount: parseFloat(amount),
    employee: employee,
  }

  const session = await getSession()
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee_debts`, {
    method: "POST", 
    headers: {
      "content-type": "application/ld+json",
      "Authorization": `Bearer ${session.token}`
    },
    body: JSON.stringify(rawData),
    cache: "no-store",
  })

  return await res.json()
}

export const addEmployeeDebtPayment = async (formData: FormData) => {
  const parsedData = await parseFormData(formData);

  const form = CreateEmployeeDebtPayment.safeParse(parsedData)
  
  const rawData = {
    ...form.data,
  }

  const session = await getSession()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee_debt_payments`, {
    method: "POST", 
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${session.token}`
    },
    body: JSON.stringify(rawData),
    cache: "no-store",
  })

  return await res.json()
}