
import './App.css'
import Pokedex from './Components/Pokedex/Pokedex'
import CostomRoutes from './Components/Routes/CostomRoutes'
import { Link } from 'react-router-dom'

function App() {

  return (
    <div className='outer-pokedex'>
    <h1 id='pokedex-heading'>
      <Link to='/'>Pokedex</Link>
    </h1>
     <CostomRoutes />
    </div>
  )
}

export default App
