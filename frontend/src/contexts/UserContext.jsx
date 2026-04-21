import { createContext, useEffect, useState } from "react"
import axios from "axios"


export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [screen, setScreen] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("access_token")

        if (!token) return

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

        axios.get("http://localhost:8000/users/me")
            .then((res) => {
                console.log("current user:", res.data)
                setUser(res.data)
            })
            .catch(() => {
                console.log("not authenticated") // token が無効な場合など

                setUser(null)
                setScreen("login")
                localStorage.removeItem("access_token")
                delete axios.defaults.headers.common["Authorization"]
            })
    }, [])

    return (
        <UserContext.Provider value={{user, setUser, screen, setScreen}}>
            {children}
        </UserContext.Provider>
    )
}
