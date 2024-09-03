import { z } from "zod";

const FormSchema = z.object({
    description: z.string(),
    amount: z.string(),
    month: z.string(),
    employee: z.string(),
  });
  
  const CreateEmployeePrime = FormSchema.omit({});
  
  export default async function addEmployeePrime(formData: FormData, options?: {redirectLink?: string}) {
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
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee_primes`, {
      method: "POST", 
      headers: {
        "content-type": "application/ld+json"
      },
      body: JSON.stringify(rawData),
      cache: "no-store",
    })
    
    const result = await res.json()
    
    // if(options && options.redirectLink) {
    //   revalidatePath(options.redirectLink, "page")
    //   redirect(options.redirectLink)
    // } else {
    //   revalidateTag("employee-primes")
    // }

    return result
  }