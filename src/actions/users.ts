'use server'
import { redirect } from 'next/navigation';
import {z} from 'zod'
import { parseFormData } from '../lib/parseFormData';

const FormSchema = z.object({
  name: z.string(), password: z.string(), email: z.string().email(),
  roles: z.string()
});

const UserCreateSchema = FormSchema.omit({});

export default async function addUser(formData: FormData) {
    const parsedData = await parseFormData(formData);

    const form = UserCreateSchema.safeParse(parsedData)

    if(form.error) {
        console.log(form.error);
        return
    }

    const rawData = {
        ...form.data, roles: [form.data.roles]
    }
    
    const res = await fetch(`${process.env.API_URL}/users`, {
        method: "POST", 
        headers: {
        "content-type": "application/json",
        // "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(rawData)
    })

    const result = await res.json()

    if(result && result.code === 401) {
        console.log(result)

        redirect('/login')
    }

    return result
}