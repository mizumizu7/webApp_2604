import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import PokemonList from './components/pokemon/PokemonList'

import { UserProvider } from './contexts/UserContext'


function App() {

  return (
    <UserProvider>
      <div className='header'>
        <Header />
      </div>
      
      <div className='app-layout'>
        <div className='sidebar'>
          <Sidebar />
        </div>

        <div className='main-area'>
          <PokemonList />
        </div>
      </div>
    </UserProvider>
  )
}

export default App
