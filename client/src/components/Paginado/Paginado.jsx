import styles from './Paginado.module.css'
import React from 'react';


export default function Paginado({pokemonsPerPage, allPokemons, paginado}){
    const pageNumbers = []

    for(let i=1; i<=Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i)
    }
    
    return(
        <nav className={styles.paginacion}>
            <ul className={styles.paginado}>
                {pageNumbers && pageNumbers?.map(number => {
                    return(
                    <li className={styles.number} key={number}>
                    <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                )})}
            </ul>
        </nav>
        )
}