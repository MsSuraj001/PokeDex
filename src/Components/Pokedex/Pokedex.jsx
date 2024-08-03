import React from 'react'
import Search from '../Search/Search'
import './Pokedex.css';
import PokemonList from '../PokemonList/PokemonList';

function Pokedex() {
  return (
    <div className='pokedex-wraper'>
      <Search />
      <PokemonList />
    </div>
  )
}

export default Pokedex
