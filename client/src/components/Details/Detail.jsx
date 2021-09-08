import styles from './Detail.module.css'
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions/index"
import { useEffect } from "react";

export default function Detail(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const myPokemon = useSelector((state) => state?.detail);
  console.log(myPokemon);
  return (
    <div className={styles.detailContainer}>
      {myPokemon ? (
        <>
          <h1 className={styles.text}>
            {myPokemon.name}
          </h1>
          <div>
            <img className={styles.pokemonImg} src={myPokemon.image} alt="" />
            <div>
              <p className={styles.healthpoints}>Healthpoints: {myPokemon.healthpoints}</p>
              <p className={styles.attack}>Attack: {myPokemon.attack}</p>
              <p className={styles.defense}>Defense: {myPokemon.defense}</p>
              <p className={styles.speed}>Speed: {myPokemon.speed}</p>
              <p className={styles.height}>Height: {myPokemon.height}</p>
              <p className={styles.weight}>Weight: {myPokemon.weight}</p>
              <p className={styles.id}>ID: {myPokemon.id}</p>
            </div>
          </div>
          <div className={styles.typeContainer}>
            {myPokemon?.types?.map((el, index) => {
              return (
                <div
                  className={styles.type}
                  key={index}
                >
                  <img className={styles.typeImg} src={el.image} alt={el.name} />
                  <p className={styles.typeName}> {el.name} </p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Link className={styles.link} to="/home">
        Volver
      </Link>
    </div>
  );
}
