import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import PokemonList from './components/pokemon/PokemonList'

import { UserProvider } from './contexts/UserContext'
import { FavoriteProvider } from './contexts/FavoriteContext'


function App() {

  return (
    <UserProvider>
    <FavoriteProvider>
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
    </FavoriteProvider>
    </UserProvider>
  )
}

export default App
