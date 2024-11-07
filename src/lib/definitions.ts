import {z} from "zod";

export const LoginFormSchema = z.object({
    email: z.string().email("Veuillez rensigner un email valide").trim(),
    password: z.string({message: "Veuillez renseigner le mot de passe"}).min(8, "Veuillez renseigner le mot de passe").trim()
})

export type LoginFormState =
    | {
    errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
    }
    message?: string
}
    | undefined