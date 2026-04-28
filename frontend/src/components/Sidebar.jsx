import { useContext } from "react"
import apiClient from "../api/apiClient"

import "./Sidebar.css"
import RegisterForm from "./users/RegisterForm"
import LoginForm from "./users/LoginForm"
import LogoutForm from "./users/LogoutForm"
import SearchPokemon from "./pokemon/SearchPokemon"

import { UserContext } from "../contexts/UserContext"


const Sidebar = () => {

    const { user, setUser, screen, setScreen } = useContext(UserContext);

    const handleRegisterSuccess = () => {
        setScreen("login")
    }

    const handleLoginSuccess = (token) => {
        localStorage.setItem("access_token", token)

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
    }

    const handleLogout = () => {
        setUser(null)
        setScreen("login")
        localStorage.removeItem("access_token")
    }

    return (
        <>
            <div className="user-info">
                {user ? (
                    <>
                    {user.username}さん
                    <LogoutForm onLogout={ handleLogout } />
                    <div className="search-area">
                        <SearchPokemon />
                    </div>
                    </>
                ) : (
                    <>
                    {screen === "register" && (
                        <RegisterForm onRegisterSuccess={ handleRegisterSuccess } />
                    )}
                    {screen === "login" && (
                        <LoginForm onLoginSuccess={ handleLoginSuccess } />
                    )}
                    </>
                )}
            </div>
        </>
    )
}

export default Sidebar
