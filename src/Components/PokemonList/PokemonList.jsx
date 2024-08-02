import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {

    const [pokemonList, setpokemonList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon'

    async function downloadPokemons(){
        const response = await axios.get(POKEDEX_URL);
        // console.log(response.data);   // next or previews url in this object
        const pokemonResult = response.data.results
        // console.log(pokemonResult);
        const pokemonResultPromise = pokemonResult.map( (pokemon) => axios.get(pokemon.url) )
        // console.log(pokemonResultPromise);
        
        const pokemonData = await axios.all(pokemonResultPromise)
        // console.log(pokemonData);

        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            // console.log(pokemon);
            return {
                id : pokemon.id,
                name: pokemon.name, 
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny, 
                types : pokemon.types
            }
        })
        console.log(pokeListResult);
        setpokemonList(pokeListResult)
        setIsLoading(false)
    }

    useEffect(() => {
        downloadPokemons()
    }, [])

  return (
    <div className='pokemon-list-wrapper'>
      <div>List of pokemons</div>

        <div className='pokemon-wrapper'>
            {(isLoading) ? 'Loading....' : 
                pokemonList.map( (p)=>  <Pokemon name={p.name} image={p.image} key={p.id} /> )
            }
        </div>
      
    </div>
  )
}

export default PokemonList
