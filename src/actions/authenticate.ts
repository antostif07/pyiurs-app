import {z} from 'zod'

const FormSchema = z.object({
    email: z.string(),
    password: z.string(),
  })

const PostLogin = FormSchema.omit({});

export default async function login(formData: FormData) {
    const {email, password} = PostLogin.parse({
      email: formData.get('email'),
      password: formData.get('password')
    })
    
    const rawData = {
      email: email, password: password,
    }
  
    const res = await fetch(`${process.env.API_URL}/login_check`, {
      method: "POST", 
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(rawData)
    })
  
    const result = await res.json()
  
    return result
  }