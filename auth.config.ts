import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    session: {
        strategy: "jwt",
    },
    // pages: {
    //     signIn: "/login",
    // },
    providers: [],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.user = user
            }

            return token
        },
        async session({session, token}: any) {
            session.user = token.user;
            
            return session;
        },
    },
    // debug: process.env.NODE_ENV === 'development'
} satisfies NextAuthConfig