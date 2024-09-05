import { authConfig } from '@/auth.config'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const {handlers, signIn, signOut, auth} = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: {
                    label: "email", type: "text"
                }, password: { label: "password", type: "password"}
            },
            authorize: async (credentials) => {
                if(credentials === null) return null

                try {
                    const users = [
                        {
                            name: "pierrette.malungidi@pyiurs.com", pass: "72569841", token: "PB - 24"
                        },
                        {
                            name: "louise.massanzi@pyiurs.com", pass: "52697523", token: "PB - KTM"
                        },
                        {
                            name: "ange.kamanda@pyiurs.com", pass: "48238134", token: "PB - MTO"
                        },
                        {
                            name: "bony.tshiunza@pyiurs.com", pass: "69325872", token: "PB - LMB"
                        },
                    ]
                    // const res = await fetch(`${process.env.API_URL}/login_check`, {
                    //     headers: {
                    //         "Content-Type": "application/json"
                    //     },
                    //     body: JSON.stringify({
                    //         email: credentials.email, password: credentials.password
                    //     }),
                    //     method: "POST"
                    // })
                    const user = users.find((user => user.name === credentials.email && user.pass === credentials.password))
                    
                    if(user) {
                        // const r = await fetch(`${process.env.API_URL}/users/me`, {
                        //     headers: {
                        //         "Content-Type": "application/json",
                        //         "Authorization": `Bearer ${result.token}`
                        //     },
                        //     method: "GET"
                        // })

                        // const user = await r.json()
                        
                        return {
                            name: user.name,
                            email: user.name,
                            access_token: user.token
                        }
                    } else {
                        throw new Error('error');
                    }

                } catch (error) {
                    // @ts-ignore
                    throw new Error(error.toString())
                }
            }
        })
    ]
})