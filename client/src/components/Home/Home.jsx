import styles from "./Home.module.css";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  getTypes,
  filterByType,
  filterByCreation,
  orderByName,
  orderByAttack,
  reloadPokemons,
} from "../../actions/index";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const allPokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.types);

  const [currentPage, setCurrentPage] = useState(1);
  const [orden, setOrden] = useState("");
  const [orden2, setOrden2] = useState("");
  const [pokemonsPerPage, setPokemonsPerPage] = useState(9);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = Array.isArray(allPokemons)
    ? allPokemons?.slice(indexOfFirstPokemon, indexOfLastPokemon)
    : allPokemons;
  console.log(currentPokemons);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
    setLoading(false);
  }, [dispatch]);

  function handleClick(el) {
    el.preventDefault();
    dispatch(getTypes());
    dispatch(reloadPokemons());
  }

  function handleFilterTypes(el) {
    dispatch(filterByType(el.target.value));
  }
  function handleFilterCreation(el) {
    dispatch(filterByCreation(el.target.value));
  }

  function handleSortAlf(el) {
    el.preventDefault();
    dispatch(orderByName(el.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${el.target.value}`);
  }

  function handleSortAtt(el) {
    el.preventDefault();
    dispatch(orderByAttack(el.target.value));
    setCurrentPage(1);
    setOrden2(`Ordenado ${el.target.value}`);
  }

  return loading ? (
    <div className={styles.cargando}>"Cargando..."</div>
  ) : (
    <div className={styles.home}>
      <div>
        <Link className={styles.link} to="/create">
          Crear pokemon
        </Link>
      </div>
      <h1 className={styles.title}>POKÉMON</h1>
      <button
      value="All"
        className={styles.button}
        onClick={(el) => {
          handleClick(el);
        }}
      >
        Volver a cargar los pokemons
      </button>
      <div>
        <div>
          <select className={styles.sorting} onChange={(el) => handleSortAlf(el)}>
            <option value="ascAlf">Ascendente alfabetico</option>
            <option value="descAlf">Descendente alfabetico</option>
          </select>
          <select className={styles.sorting} onChange={(el) => handleSortAtt(el)}>
            <option value="ascStr">Ascendente por fuerza</option>
            <option value="descStr">Descendente por fuerza</option>
          </select>
          <select className={styles.sorting} onChange={(el) => handleFilterTypes(el)}>
            <option value="All">Todos</option>
            {allTypes?.map((el) => {
              return (
                <option value={el.name} key={el.name}>
                  {el.name.charAt(0).toUpperCase() + el.name.slice(1)}
                </option>
              );
            })}
          </select>
          <select className={styles.sorting} onChange={(el) => handleFilterCreation(el)}>
            <option value="All">Todos</option>
            <option value="created">Creados</option>
            <option value="api">Existentes</option>
          </select>
        </div>
        <Paginado
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons?.length}
          paginado={paginado}
        />
        <SearchBar />
        <div>
          {currentPokemons?.length > 0 ? (
            currentPokemons?.map((el) => {
              return (
                <div key={el.id}>
                  <Link to={"/home/" + el.id}>
                    <Card name={el.name} image={el.image} types={el.types} />
                  </Link>
                </div>
              );
            })
          ) : Object.entries(currentPokemons).length !== 0 ? (
            <div key={currentPokemons.id}>
              <Link to={"/home/" + currentPokemons.id}>
                <Card
                  name={currentPokemons.name}
                  image={currentPokemons.image}
                  types={currentPokemons.types}
                />
              </Link>
            </div>
          ) : (
            <div className={styles.cargando}>"Cargando..."</div>
          )}
        </div>
      </div>
    </div>
  );
}
