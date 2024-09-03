import { z } from "zod";
import { parseFormData } from "../lib/parseFormData";

const FormSchema = z.object({
  description: z.string(),
  amount: z.string(),
  employee: z.string(),
});

const FormEmployeeDebtPayementSchema = z.object({
  employeeDebt: z.string(),
  amount: z.number(),
  employeePayment: z.string(),
});
  
const CreateEmployeeDebt = FormSchema.omit({});
const CreateEmployeeDebtPayment = FormEmployeeDebtPayementSchema.omit({});
  
export default async function addEmployeeDebt(formData: FormData, options?: {redirectLink?: string}) {
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
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee_debts`, {
    method: "POST", 
    headers: {
      "content-type": "application/ld+json"
    },
    body: JSON.stringify(rawData),
    cache: "no-store",
  })
  
  const result = await res.json()

  console.log(result);
  
  return result
}

export const addEmployeeDebtPayement = async (formData: FormData, options?: {redirectLink?: string}) => {
  const parsedData = await parseFormData(formData);

  const form = CreateEmployeeDebtPayment.safeParse(parsedData)
  
  const rawData = {
    ...form.data,
  }
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee_debt_payments`, {
    method: "POST", 
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(rawData),
    cache: "no-store",
  })
  
  const result = await res.json()

  return result
}