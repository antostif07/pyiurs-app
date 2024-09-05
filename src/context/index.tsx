'use client'
import { createContext, useContext, useState } from "react"

const AppContext = createContext<any>(undefined)

export function AppWrapper({ children }: {
    children: React.ReactNode
}) {
    let [user, setUser] = useState(null)

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

    return (
        <AppContext.Provider value={{user, setUser, users}}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext)
}