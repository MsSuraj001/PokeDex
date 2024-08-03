import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {

    const [pokemonList, setpokemonList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');

    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('')

    async function downloadPokemons(){
        setIsLoading(true)
        const response = await axios.get(pokedexUrl);
        // console.log(response.data);   // next or previews url in this object
        const pokemonResult = response.data.results
        // console.log(pokemonResult);

        setNextUrl(response.data.next)
        setPrevUrl(response.data.previous)
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
    }, [pokedexUrl])

  return (
    <div className='pokemon-list-wrapper'>
      <div className='pokemon-heading'>List-of-Pokemons</div>

        <div className='pokemon-wrapper'>
            {(isLoading) ? 'Loading....' : 
                pokemonList.map( (p)=>  <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/> )
            }
        </div>
      
      <div className='control'>
        <button disabled={prevUrl == null} onClick={ () => setPokedexUrl(prevUrl)}>Prev</button>
        <button disabled={nextUrl == null} onClick={ () => setPokedexUrl(nextUrl)}>Next</button>
      </div>
    </div>
  )
}

export default PokemonList
