import styles from './SearchBar.module.css'
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../../actions/index";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(el) {
    el.preventDefault();
    setName(el.target.value);
  }

  function cleanInput() {
    let i = document.getElementById("busqueda");
    i.value = "";
  }

  function handleSubmit(el) {
    el.preventDefault();
    cleanInput();
    dispatch(getNamePokemons(name));
  }

  return (
    <div>
      <input
        className={styles.searchbar}
        type="text"
        placeholder="Buscar..."
        onChange={(e) => handleInputChange(e)}
        id="busqueda"
      />
      <button className={styles.button} type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}
