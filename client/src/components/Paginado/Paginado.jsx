import React from 'react';
import "./Paginado.css"

export default function Paginado({pokemonsPerPage, allPokemons, paginado}){
    const pageNumbers = []

    for(let i=1; i<=Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i)
    }
    
    return(
        <nav className="paginacion">
            <ul className="paginado">
                {pageNumbers && pageNumbers?.map(number => {
                    return(
                    <li className="number" key={number}>
                    <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                )})}
            </ul>
        </nav>
        )
}