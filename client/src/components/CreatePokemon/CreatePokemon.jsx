import styles from './CreatePokemon.module.css'
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { createPokemon, getTypes, reloadPokemons } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  name: "",
  image: "",
  healthpoints: null,
  attack: null,
  defense: null,
  speed: null,
  height: null,
  weight: null,
  types: [],
};

export default function CharacterCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const [error, setError] = useState(initialState);
  const [input, setInput] = useState(initialState);

  const handleInputChange = function (el) {
    setInput({
      ...input,
      [el.target.name]: el.target.value,
    });
  };

  const validateInput = function (el) {
    let { name } = el.target;
    let numerics = [
      "healthpoints",
      "attack",
      "defense",
      "speed",
      "height",
      "weight",
    ];
  if (name === "name") {
    if (!/^[A-Z]+$/i.test(el.target.value)) {
      setError({ ...error, [name]: "El nombre solo debe contener letras..." });
    } else {
      setError({ ...error, [name]: "" });
    }
  }
  if (name === "image") {
    if (!el.target.value) {
      setError({ ...error, [name]: "Debe haber una imagen..." });
    } else {
      setError({ ...error, [name]: "" });
    }
  }
  if (numerics.includes(name)) {
    if (el.target.value === "") {
      setError({ ...error, [name]: "Las estadisticas solo pueden ser numericas..." });
    } else {
      setError({ ...error, [name]: "" });
    }
  }
};
  const clearForm = function () {
    setInput(initialState);
  };

  const handleTypes = function (el) {
    let type1 = document.getElementById("firstType").value;
    el.target.name === "firstType"
      ? setInput({
          ...input,
          types: [
            {
              name: el.target.value,
              image: `https://typedex.app/types/${el.target.value}.png`,
            },
          ],
        })
      : setInput({
          ...input,
          types: [
            { name: type1, image: `https://typedex.app/types/${type1}.png` },
            {
              name: el.target.value,
              image: `https://typedex.app/types/${el.target.value}.png`,
            },
          ],
        });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch(createPokemon(input));
    dispatch(reloadPokemons());
    clearForm();
    history.push('/home')
  };

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  return (
    <div className={styles.body}>
      <Link className={styles.link} to="/home">
        Volver
      </Link>
      <h1 className={styles.create}>Creá tu Pokemon</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.name}>
          <label>Nombre:</label>
          <input
            onChange={(el) => {
              handleInputChange(el);
              validateInput(el);;
              
            }}
            required={true}
            type="text"
            name="name"
            value={input.name}
            className={error && "An error has been detected..."}
          />
          <span className="error">{error?.name}</span>
        </div>
        <div className={styles.image}>
          <label>Image:</label>
          <input
            onChange={(el) => {
              handleInputChange(el);
              validateInput(el);
            }}
            type="text"
            name="image"
            value={input.image}
            className={error.image && "An error has been detected..."}
          />
          <span className="error">{error?.image}</span>
        </div>
        <div className={styles.healthpoints}>
          <label>Healthpoints:</label>
          <input
            onChange={(el) => {
              handleInputChange(el);
              validateInput(el);
            }}
            type="number"
            name="healthpoints"
            value={input.healthpoints}
          />
          <span className="error">{error?.healthpoints}</span>
        </div>
        <div className={styles.attack}>
          <label>Attack:</label>
          <input
            onChange={(el) => {
              handleInputChange(el);
              validateInput(el);
            }}
            type="number"
            name="attack"
            value={input.attack}
          />
          <span className="error">{error?.attack}</span>
        </div>
        <div className={styles.defense}>
          <label>Defense:</label>
          <input
            onChange={(el) => {
              handleInputChange(el);
              validateInput(el);
            }}
            type="number"
            name="defense"
            value={input.defense}
          />
          <span className="error">{error?.defense}</span>
        </div>
        <div className={styles.speed}>
          <label>Speed:</label>
          <input
            onChange={(el) => {
              handleInputChange(el);
              validateInput(el);
            }}
            type="number"
            name="speed"
            value={input.speed}
          />
          <span className="error">{error?.speed}</span>
        </div>
        <div className={styles.height}>
          <label>Height:</label>
          <input
            onChange={(el) => {
              handleInputChange(el);
              validateInput(el);
            }}
            type="number"
            name="height"
            value={input.height}
          />
          <span className="error">{error?.height}</span>
        </div>
        <div className={styles.weight}>
          <label>Weight:</label>
          <input
            onChange={(el) => {
              handleInputChange(el);
              validateInput(el);
            }}
            type="number"
            name="weight"
            value={input.weight}
          />
          <span className="error">{error?.weight}</span>
        </div>
        <div>
          <select
          className={styles.select}
            id="firstType"
            name="firstType"
            onChange={(el) => handleTypes(el)}
          >
            {types?.map((el) => {
              return (
                <option value={el.name} key={el.name}>
                  {el.name.charAt(0).toUpperCase() + el.name.slice(1)}
                </option>
              );
            })}
          </select>
          {input.types.length > 0 && (
            <select className={styles.select} name="secondType" onChange={(el) => handleTypes(el)}>
              {types?.map((el) => {
                return (
                  <option value={el.name} key={el.name}>
                    {el.name.charAt(0).toUpperCase() + el.name.slice(1)}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
