import styles from './Card.module.css'
import React from 'react';

export default function Card({name, image, types}){
    return (
        <div className={styles.card}>
            <h1 className={styles.name} style={{ textTransform: "capitalize" }}>{name}</h1>
            <img className={styles.image} src={image} alt={name}/>
            <div>
               {types.map((el, index) => {
                   return(
                       <div className={styles.types} key={index}>
                       <img className={styles.typesImg} src={el.image} alt={el.name} />
                       <p className={styles.typeName}> {el.name} </p>
                       </div>
                   )
               })}
            </div>
        </div>
    )
}