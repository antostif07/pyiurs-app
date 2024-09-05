import { redirect } from "next/navigation"

export default function getUser() {
    // @ts-ignore
    const user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null

    if(!user) {
        redirect('/login')
    }

    return user
}