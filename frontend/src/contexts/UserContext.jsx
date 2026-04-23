import { createContext, useEffect, useState } from "react"
import apiClient from "../api/apiClient"


export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [screen, setScreen] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        if (!token) {
            setUser(null)
            return
        }
        
        apiClient.get("/users/me")
            .then((res) => {
                console.log("current user:", res.data)
                setUser(res.data)
            })
            .catch(() => {
                console.log("not authenticated") // token が無効な場合など
                setUser(null)
                setScreen("login")
            })
    }, [])

    return (
        <UserContext.Provider value={{user, setUser, screen, setScreen}}>
            {children}
        </UserContext.Provider>
    )
}
