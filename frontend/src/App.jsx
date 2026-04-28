import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import PokemonList from './components/pokemon/PokemonList'
import Ranking from './components/ranking/Ranking'


function App() {

  return (
    <>
      <div className='header'>
        <Header />
      </div>
      
      <div className='app-layout'>
        <div className='sidebar'>
          <Sidebar />
        </div>

        <div className='main-area'>
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/ranking" element={<Ranking />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
