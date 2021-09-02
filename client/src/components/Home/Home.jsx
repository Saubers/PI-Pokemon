import React from 'react';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes,filterByType } from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card'
import Paginado from '../Paginado/Paginado';

export default function Home(){
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch()
    
    const allPokemons = useSelector((state) => state?.pokemons);
    const types = useSelector((state) => state?.types);
    // Declaro una constante para con useSelector traer todo lo que esta en el estado de pokemon
    const [currentPage, setCurrentPage ] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage ] = useState(9)
    const indexOfLastPokemon = currentPage * pokemonsPerPage
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
    const currentPokemons = Array.isArray(allPokemons)
    ? allPokemons?.slice(indexOfFirstPokemon, indexOfLastPokemon)
    : allPokemons;
  console.log(currentPokemons);
  

    const paginado = (pageNumber) => {
      setCurrentPage(pageNumber)
    }
    
    useEffect(()=> {
        dispatch(getPokemons());
        dispatch(getTypes());
        setLoading(false)
    },[dispatch])
    
function handleClick(event){
    event.preventDefault();
    dispatch(getPokemons());
    dispatch(getTypes());
}

function handleFilterTypes(el){
  dispatch(filterByType(el.target.value))
}

    return (
        <div>
      <Link to='/pokemons'>Crear Pokemon</Link>
      <h1>Pokedex</h1>
      <button onClick={e => {handleClick(e)}}>Recargar</button>
      <div>
          <select>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <select>
            <option value="str_asc">Ascendente por fuerza</option>
            <option value="str_desc">Descendente por fuerza</option>
          </select>
          <select onChange={(el) => handleFilterTypes(el)}>
            <option value="All">Todos</option>
            {types && types?.map((el) => {
              return (
                <option value="others">
                  {el.name?.charAt().toUpperCase() + el.name?.slice(1)}
                </option>
              );
            })}
          </select>
          <select>
            <option value="All">Todos</option>
            <option value="created">Creados</option>
            <option value="api">Existentes</option>
          </select>
          <Paginado
          pokemonsPerPage = {pokemonsPerPage}
          allPokemons = {allPokemons?.length}
          paginado = {paginado}
          />
        {currentPokemons && currentPokemons?.map(el =>{
                return (
                <Card name={el.name} image={el.image} types={el.types} />
                )
            })
        }
      </div>
        </div>
        )
}