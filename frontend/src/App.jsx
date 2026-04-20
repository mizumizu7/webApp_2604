import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'
import PokemonList from './components/pokemon/PokemonList'
import Sidebar from './components/Sidebar'
import Header from './components/Header'


function App() {
  const [user, setUser] = useState(null)
  const [screen, setScreen] = useState("")

  const auth = {
    user,
    setUser,
    screen,
    setScreen,
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token")

    if (token) {
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
    }
  }, [])


  return (
    <>
    <div className='header'>
        <Header auth={auth}/>
    </div>
    
    <div className='app-layout'>
      <div className='sidebar'>
        <Sidebar auth={auth} />
      </div>

      <div className='main-area'>
        <PokemonList user={user} />
      </div>
    </div>
    </>
  )
}

export default App
