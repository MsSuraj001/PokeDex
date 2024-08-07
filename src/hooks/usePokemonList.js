import axios from "axios";
import { useState,useEffect } from "react";

function usePokemonList(){
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList : [],
        isLoading : true,
        pokemonUrl : 'https://pokeapi.co/api/v2/pokemon',
        nextUrl : '',
        prevUrl : '',
    })

    async function downloadPokemons(){
        setPokemonListState((state) => ({ ...state, isLoading: true}));
        const response = await axios.get(pokemonListState.pokemonUrl);
        // console.log(response.data);   // next or previews url in this object
        const pokemonResult = response.data.results
        console.log(pokemonResult);

        setPokemonListState((state) => ({

          // ...pokemonListState,
          ...state,
           nextUrl : response.data.next,
           prevUrl : response.data.previous
        }))
        // setPokemonListState({...pokemonListState, prevUrl : response.data.previous})
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
        setPokemonListState((state) => ({
          // ...pokemonListState,
          ...state,
          pokemonList: pokeListResult, 
          isLoading : false
        }))
        // setIsLoading(false)
    }

    useEffect(()=>{
        downloadPokemons()
    },[pokemonListState.pokemonUrl])

    return {
        pokemonListState,
        setPokemonListState
    }
}

export default usePokemonList;