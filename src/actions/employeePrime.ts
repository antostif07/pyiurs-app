import {z} from "zod";
import {getSession} from "@/src/actions/auth";

const FormSchema = z.object({
    description: z.string(),
    amount: z.string(),
    month: z.string(),
    employee: z.string(),
  });
  
  const CreateEmployeePrime = FormSchema.omit({});
  
  export default async function addEmployeePrime(formData: FormData) {
    const {
      description, amount, month, employee
    } = CreateEmployeePrime.parse({
      description: formData.get('description'),
      amount: formData.get('amount'),
      month: formData.get('month'),
      employee: formData.get('employee'),
    })
  
    const rawData = {
      description: description,
      amount: parseFloat(amount),
      month: month,
      employee: employee,
    }

    const session = await getSession()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee_primes`, {
      method: "POST", 
      headers: {
        "content-type": "application/ld+json",
        "Authorization": `Bearer ${session.token}`
      },
      body: JSON.stringify(rawData),
    })

    return await res.json()
  }