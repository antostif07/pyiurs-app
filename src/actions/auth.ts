"use server"
import {LoginFormSchema, LoginFormState} from "@/src/lib/definitions";
import {getIronSession} from "iron-session";
import {defaultSession, SessionData, sessionOptions} from "@/src/types/sessions";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function getSession() {
    const cookieData = await cookies()
    const session = await getIronSession<SessionData>(cookieData, sessionOptions)

    // If user visits for the first time session returns an empty object.
    // Let's add the isLoggedIn property to this object and its value will be the default value which is false
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }

    return session
}

export async function login(state: LoginFormState, formData: FormData) {
    // Validate form fields
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            code: 400
        }
    }

    const rawData = {
        ...validatedFields.data
    }

    // If form fields valid, try to connect
    try {
        const session = await getSession()

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login_check`, {
            method: "POST",
            headers: {
                "content-type": "application/ld+json"
            },
            body: JSON.stringify(rawData)
        })

        const result = await response.json()

        if (result && result.code === 401) {
            return result
        }

        const getMe = await fetch(`${process.env.API_URL}/users/me`, {
            method: "GET",
            headers: {
                "content-type": "application/ld+json",
                "Authorization": `Bearer ${result.token}`
            }
        })

        const resGetMe = await getMe.json()

        if(resGetMe && !resGetMe.id) {
            return { code: resGetMe.code, message: "Login Failed"}
        }

        session.isLoggedIn = true
        session.name = resGetMe.name
        session.userId = resGetMe.id
        session.email = resGetMe.email
        session.roles = resGetMe.roles
        session.token = result.token

        await session.save()

        redirect('/')
    } catch (e) {
        console.log(e)
    }
}

export async function logout() {
    const session = await getSession();
    session.destroy();
    redirect("/login")
}
