'use server'
import { format } from 'date-fns';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {z} from 'zod'

const FormSchema = z.object({
  name: z.string(),
  assignment: z.string(),
  salary: z.coerce.number(),
  transportFee: z.coerce.number(),
  total_days: z.coerce.number(),
  start_date: z.string(),
  employee_function: z.string(),
  team: z.string(),
  department: z.string(),
  address: z.string(),
  job_status: z.string(),
  matricule: z.string()
});

const CreateEmployee = FormSchema.omit({});

export default async function addEmployee(formData: FormData) {
  const {name, assignment, salary, transportFee, total_days, address, start_date, team, department, job_status, matricule, employee_function} = CreateEmployee.parse({
    name: formData.get('name'),
    assignment: formData.get('assignment'),
    salary: formData.get('salary_amount'),
    transportFee: formData.get('transport_amount'),
    total_days: formData.get('total_days'),
    address: formData.get('address'),
    start_date: formData.get('start_date'),
    team: formData.get('team'),
    department: formData.get('department'),
    job_status: formData.get('job_status'),
    matricule: formData.get('matricule'),
    employee_function: formData.get('employee_function'),
  })

  const rawData = {
    name: name,
    assignment: assignment,
    salary: salary,
    transportFee: transportFee,
    total_days: total_days,
    address: address,
    start_date: format(start_date, "yyyy-MM-dd"),
    team: team, department: department,
    job_status: job_status,
    employee_function: employee_function,
    matricule: matricule,
  }
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`, {
    method: "POST", 
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(rawData)
  })
  
  const result = await res.json()

  if(result['violations'] || (result['@type'] && result['@type'] === "hydra:Error")) {
    console.log(result['violations']);
  } else {
    revalidatePath('/pyiurs/rh')
    redirect('/pyiurs/rh')
  }
}