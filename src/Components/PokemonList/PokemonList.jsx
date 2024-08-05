import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';
import usePokemonList from '../../hooks/usePokemonList';

function PokemonList() {

  const {pokemonListState, setPokemonListState} = usePokemonList();

    // const [pokemonList, setpokemonList] = useState([])
    // const [isLoading, setIsLoading] = useState(true)

    // const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');

    // const [nextUrl, setNextUrl] = useState('');
    // const [prevUrl, setPrevUrl] = useState('')

    // const [pokemonListState, setPokemonListState] = useState({
    //   pokemonList : [],
    //   isLoading: true,
    //   pokedexUrl : 'https://pokeapi.co/api/v2/pokemon',
    //   nextUrl : '',
    //   prevUrl : ''
    // })

    // async function downloadPokemons(){
    //     // setIsLoading(true)
    //     setPokemonListState((state) => ({ ...state, isLoading: true}));
    //     const response = await axios.get(pokemonListState.pokedexUrl);
    //     // console.log(response.data);   // next or previews url in this object
    //     const pokemonResult = response.data.results
    //     console.log(pokemonResult);

    //     setPokemonListState((state) => ({

    //       // ...pokemonListState,
    //       ...state,
    //        nextUrl : response.data.next,
    //        prevUrl : response.data.previous
    //     }))
    //     // setPokemonListState({...pokemonListState, prevUrl : response.data.previous})
    //     const pokemonResultPromise = pokemonResult.map( (pokemon) => axios.get(pokemon.url) )
    //     // console.log(pokemonResultPromise);
        
    //     const pokemonData = await axios.all(pokemonResultPromise)
    //     // console.log(pokemonData);

    //     const pokeListResult = pokemonData.map((pokeData) => {
    //         const pokemon = pokeData.data;
    //         // console.log(pokemon);
    //         return {
    //             id : pokemon.id,
    //             name: pokemon.name, 
    //             image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny, 
    //             types : pokemon.types
    //         }
    //     })
    //     console.log(pokeListResult);
    //     setPokemonListState((state) => ({
    //       // ...pokemonListState,
    //       ...state,
    //       pokemonList: pokeListResult, 
    //       isLoading : false
    //     }))
    //     // setIsLoading(false)
    // }

    // useEffect(() => {
    //     downloadPokemons()
    // }, [pokemonListState.pokedexUrl])

  return (
    <div className='pokemon-list-wrapper'>
      <div className='pokemon-heading'>List-of-Pokemons</div>

        <div className='pokemon-wrapper'>
            {(pokemonListState.isLoading) ? 'Loading....' : 
                pokemonListState.pokemonList.map( (p)=>  <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/> )
            }
        </div>
      
      <div className='control'>
        <button disabled={pokemonListState.prevUrl == null} onClick={ () => setPokemonListState({ ...pokemonListState, pokedexUrl : pokemonListState.prevUrl})}>Prev</button>
        <button disabled={pokemonListState.nextUrl == null} onClick={ () => setPokemonListState({ ...pokemonListState, pokedexUrl : pokemonListState.nextUrl})}>Next</button>
      </div>
    </div>
  )
}

export default PokemonList
