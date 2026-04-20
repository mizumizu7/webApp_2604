import axios from "axios"
import RegisterForm from "./users/RegisterForm"
import LoginForm from "./users/LoginForm"
import LogoutForm from "./users/LogoutForm"
import SearchPokemon from "./pokemon/SearchPokemon"
import "./Sidebar.css"

const Sidebar = ({auth: {user, setUser, screen, setScreen}}) => {
    const handleRegisterSuccess = () => {
        setScreen("login")
    }

    const handleLoginSuccess = (token) => {
        localStorage.setItem("access_token", token)

        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${token}`

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

        // 将来的にはinterceptorでの共通化処理を推奨(APIが増える, 認証必須APIが多い, 401処理を一元化したい)
    }

    const handleLogout = () => {
        setUser(null)
        setScreen("login")
        localStorage.removeItem("access_token")
        delete axios.defaults.headers.common["Authorization"]
    }

    return (
        <>
            <div className="user-info">
                {user ? (
                    <>
                    {user.username}さん
                    <LogoutForm onLogout={ handleLogout } />
                    <div className="search-area-2">
                        <SearchPokemon />
                    </div>
                    </>
                ) : (
                    <>
                    <button onClick={() => setScreen("register")}>アカウント登録</button>
                    <button onClick={() => setScreen("login")}>ログイン</button>

                    {screen === "register" && (
                        <RegisterForm onRegisterSuccess={ handleRegisterSuccess } />
                    )}
                    {screen === "login" && (
                        <LoginForm onLoginSuccess={ handleLoginSuccess } />
                    )}
                    </>
                )}
            </div>
            
            {/* 検索機能はログイン後に使えるように変更 */}
            {/* <div className="search-area-1">
                <SearchPokemon />
            </div> */}
        </>
    )
}

export default Sidebar
