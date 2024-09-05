'use server'

import { signIn, signOut } from '@/lib/auth'
import { AuthError } from "next-auth";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().trim().min(1, {message: "Email required"}).email({message: "Invalid Email"}),
    password: z.string().min(1, {message: "Password required!"}).min(8, {message: "Mot de passe a au moins 8 caracteres"})
})
const defaultValues = {
    email: "",
    password: ""
}
// prevState: any, 
export async function login(formData: FormData) {
    try {
        const email = formData.get("email");
        const password = formData.get("password")

        const validateFields = loginSchema.safeParse({
            email: email, password: password,
        })

        if(!validateFields.success) {
            return {
                message: 'validation error',
                errors: validateFields.error.flatten().fieldErrors,
            }
        }

        const res = await signIn("credentials", {
            email: email, password: password, redirect: false, redirectTo: '/'
        })
        
        return res
    } catch (error) {
        
        if(error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        message: "Erreur des donnees",
                        errors: { ...defaultValues,  credentials: "incorrect email or password"}
                    };
                    break;
                default:
                    return {
                        message: "Unknown error",
                        errors: { ...defaultValues,}
                    }
                    break;
            }
        }
        throw error
    }
}

export async function logout() {
    await signOut()
}